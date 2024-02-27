'use client';

import { useForm } from 'react-hook-form';
import { Form } from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

export default function AccountProfile({ user, btnTitle }: Props) {
    const form = useForm({
        resolver: zodResolver(),
    });

    return (
        <Form>
            Hello stuff
            <div></div>
        </Form>
    );
}
