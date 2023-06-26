import {useEffect, useState} from 'react';
import {
    Box,
    VStack,
} from '@chakra-ui/react';
import InfoSection from './InfoSection';
import ProjectDisplay from './ProjectDisplay';
import axios from 'axios';
import { type User, type ProjectView } from '../../types';

enum profileState {
    Loading,
    Invalid,
    Self,
    Other,
}

export default function ProfileInfo(props : {username : string}) {
    const [user, setUser] = useState<User>({
        AboutMe: '',
        Email: '',
        Name: '',
        Title: '',
        ProfilePic: '',
        Username: '',
        Projects: [] as ProjectView[],
    });
    const [currProfileState, setCurrProfileState] = useState<profileState>(profileState.Loading);

    useEffect(() => {
        const baseUrl = process.env.BACKEND_BASE_URL || "";
        const currentUrl = baseUrl + '/auth/user';
        const profileUrl = baseUrl + '/users/' + props.username;
        if (props.username !== '') {
            axios.get(currentUrl, { withCredentials: true })
            .then((res) => {
                const currentUser = res.data.data.Username;
                axios.get(profileUrl).then((res) => {
                    const { AboutMe, Email, Name, Title, ProfilePic, Projects } : User = res.data.data;
                    setUser({
                        AboutMe: AboutMe || 'No description available',
                        Email,
                        Name: Name || 'No display name',
                        Title: Title || 'No title available',
                        ProfilePic,
                        Username: props.username,
                        Projects,
                    });
                    // Compare profile user to current user
                    
                    if (currentUser === props.username) {
                        setCurrProfileState(profileState.Self);
                    } else {
                        setCurrProfileState(profileState.Other);
                    }
                }).catch((err) => {    
                    setCurrProfileState(profileState.Invalid)
                    console.log
                });
            })
            .catch((err) => {
                console.log(err);
            })
        }
        // Fetch current user
    }, [props.username]); 

    if (currProfileState === profileState.Invalid) {
        return (
            <p>invalid username</p>
        )
    }

    return (
        <Box mt={10} mx={5} p={4}>
          <VStack spacing={10} align="start">
            <InfoSection
              user={user}
              {...(currProfileState === profileState.Self && { setUser })}
            />
            <ProjectDisplay projects={ user.Projects ? user.Projects : []}/>
          </VStack>
        </Box>
      );
}
