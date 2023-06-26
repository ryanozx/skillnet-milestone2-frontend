import React from 'react';
import {
    FormControl,
    FormLabel,
    Textarea,
} from '@chakra-ui/react';
import {type FormFields} from './CreateProfilePageContainer';

const AboutMeField: React.FC<{form: FormFields, handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void}> = ({form, handleChange}) => {
    return (
        <FormControl>
            <FormLabel>About Me</FormLabel>
            <Textarea
                name="aboutMe"
                value={form.aboutMe}
                onChange={handleChange}
            />
        </FormControl>
    );
}

export default AboutMeField;