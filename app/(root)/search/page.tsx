import ProfileHeader from '@/components/shared/ProfileHeader';
import { profileTabs } from '@/constants';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Page() {
    const user = await currentUser();

    if (!user) return null;

    const userInfo = await fetchUser(user.id);

    if (!userInfo?.onboarded) {
        redirect('/onboarding');
    }

    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25,
    });

    return (
        <section>
            <h1 className='head-text mb-10'>Search</h1>
        </section>
    );
}