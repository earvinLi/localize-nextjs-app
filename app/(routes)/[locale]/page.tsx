// External Dependencies
import Link from 'next/link';

// Internal Dependencies
import Button from '@/components/base/Button';
import LanguageChanger from '@/components/LanguageChanger';
import { getT } from '@/utils/i18nUtils/i18nServerHelpers';

// Local Variables
const tutorialArticalLink = 'https://i-earvin.vercel.app/en-US/posts/how-to-localize-a-nextjs-app';

// Component Definition
export default async function Home() {
  const { t } = await getT('page_home');

  return (
    <div className='w-screen h-screen bg-gray-200 flex flex-col items-center justify-center'>
      <div className='w-1/3 bg-white rounded-xl px-8 py-6 flex flex-col gap-6'>
        <div className='flex flex-row justify-between items-center'>
          <div className='text-2xl'>{t('home_tile')}</div>
          <LanguageChanger />
        </div>
        <div className='text-lg text-gray-400'>
          {t('home_description')}
        </div>
        <Link
          href={tutorialArticalLink}
          target='_blank'
        >
          <Button variant='outlined'>{t('home_check_tutorial_button_text')}</Button>
        </Link>
      </div>
    </div>
  );
}
