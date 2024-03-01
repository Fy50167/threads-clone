'use client';

import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import * as z from 'zod';
import { Textarea } from '../ui/textarea';
import { usePathname, useRouter } from 'next/navigation';
import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions';
import { useOrganization } from '@clerk/nextjs';

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

export default function PostThread({ userId }: { userId: string }) {
    const { organization } = useOrganization();
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        },
    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname,
        });

        router.push('/');
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col justify-start gap-10 mt-10'
                >
                    <FormField
                        control={form.control}
                        name='thread'
                        render={({ field }) => (
                            <FormItem className='flex flex-col gap-3 w-full'>
                                <FormLabel className='text-base-semibold text-light-2'>
                                    Content
                                </FormLabel>
                                <FormControl className='no-focus border border-dark-3 bg-dark-3 text-light-1'>
                                    <Textarea rows={15} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type='submit' className='bg-primary-500'>
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    );
}
