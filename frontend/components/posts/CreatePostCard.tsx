import React, {useState} from "react";
import {Button, Card, CardBody, CardFooter, Textarea, useToast} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import axios from "axios";
import {PostView} from "./Post";

interface CreatePostProps {
    addPostHandler: (post : PostView) => void;
    projectID: number,
    communityID: number,
}

export default function CreatePostCard(props : CreatePostProps) {
    const [showTextField, setShowTextField] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);
    const toast = useToast();

    const onClose = () => {
        setText("");
        setShowTextField(false);
    }

    const onSubmit = async() => {
        const base_url = process.env.BACKEND_BASE_URL;
        setSubmitting(true);
        axios.post(base_url + "/auth/posts", {
            "content": text,
            "communityID": props.communityID,
            "projectID": props.projectID,
    }, {withCredentials: true})
        .then(res => {
            props.addPostHandler(res.data["data"]);
            toast({
                title: "Post created.",
                description: "Your post has been created.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            onClose();
        })
        .catch(err => {
            console.log(err);
            toast({
                title: "An error occurred.",
                description: err.response.data.error,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        })
        .finally(() => {
            setSubmitting(false);
        })
    }

    return (
            <Card bg="transparent" variant="unstyled" maxW="2xl" marginBlockStart="20px" marginInline="auto">
                {!showTextField && <CardBody display="flex" justifyContent="flex-end">
                    <Button 
                        colorScheme="telegram" 
                        leftIcon={<AddIcon></AddIcon>} 
                        maxW="40" 
                        onClick={() =>setShowTextField(true)}
                        >
                        Create Post
                    </Button>
                </CardBody>}
                {showTextField &&
                <>
                    <CardBody>
                        <Textarea bg="white" value={text} onChange={e => setText(e.target.value)}/>
                    </CardBody>
                    <CardFooter display="flex" justifyContent="flex-end" paddingInline="0px" paddingBlockStart="15px">
                        <Button 
                            colorScheme="telegram" 
                            mr={3} 
                            onClick={onSubmit}
                            isDisabled={text === ""}
                            isLoading={submitting}
                            loadingText="Submitting..."
                            >
                            Submit Post
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            Cancel
                        </Button>
                    </CardFooter>
                </>
                }
            </Card>
    )
}