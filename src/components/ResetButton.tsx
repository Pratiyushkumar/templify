import { Button } from './ui/button';

function ResetButton({handleResetButton} : {handleResetButton: () => void}) {
  return (
    <Button className="mt-5 w-full max-w-md h-10  bg-transparent border border-gray-400 hover:bg-gray-800 hover:text-white hover:border " onClick={handleResetButton}>
          <p className="tracking-wider text-base">Reset</p>
        </Button>
  )
}

export default ResetButton