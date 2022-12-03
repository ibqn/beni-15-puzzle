import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useEffect } from 'react'

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return [...array]
}

const solutionExists = (blocks) => {
  let n = 0

  for (let i = 0; i < blocks.length; i++) {
    const ni = +blocks[i]

    // console.log('ni', ni);

    if (ni === 0) {
      n += Math.floor(i / 4) + 1
      // console.log('row', Math.floor(i / 4) + 1);
      continue
    }

    for (let j = 0; j < i; j++) {
      const nj = +blocks[j]
      if (nj !== 0 && nj > ni) {
        // console.log('.', nj, ni);
        n += 1
      }
    }
  }

  // console.log('n', n, n % 2 === 0);
  return n % 2 === 0
}

const classNames = (...classes) => classes.filter(Boolean).join(' ')

const App = () => {
  const [completed, setCompleted] = useState(false)
  const [parent] = useAutoAnimate()
  const [blocks, setBlocks] = useState(
    Array.from({ length: 16 }, (_, index) => (index ? index : null))
  )

  const handleClick = (block, index) => () => {
    const i = index % 4
    const j = Math.floor(index / 4)

    if (block === null || completed) {
      return
    }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const idx = i + x + 4 * (y + j)
        // console.log('i', i, 'j', j, 'x', x, 'y', y);
        if (i + x < 4 && i + x >= 0 && blocks[idx] === null && !x ^ !y) {
          const array = [...blocks]

          ;[array[idx], array[index]] = [array[index], array[idx]]
          setBlocks(array)

          return
        }
      }
    }
  }

  const newGame = () => {
    // setBlocks([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null, 15]);
    // return;
    let array
    do {
      array = shuffle(blocks)
      setBlocks(array)
    } while (!solutionExists(array))
  }

  useEffect(newGame, [])

  const isCompleted = () => {
    console.log(blocks)
    for (let i = 0; i < blocks.length - 2; i++) {
      if (blocks[i] === null || blocks[i] > blocks[i + 1]) {
        console.log('here')
        return false
      }
    }
    console.log('done')
    return true
  }

  useEffect(() => setCompleted(isCompleted()), [blocks])

  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      <button
        className="rounded-full bg-dimgray py-2 px-4 font-bold text-white hover:scale-[1.02] hover:bg-dimgray/90"
        onClick={newGame}
      >
        shuffle
      </button>
      <div
        className={classNames(
          completed && 'border-4 border-green-400 p-1',
          'flex justify-center'
        )}
      >
        <div ref={parent} className="grid grid-cols-four grid-rows-four gap-0">
          {blocks.map((value, index) => {
            return (
              <div
                onClick={handleClick(value, index)}
                className={classNames(
                  !!value ? 'bg-cornsilk' : 'bg-dimgray',
                  'mb-[-1px] ml-[-1px] flex select-none items-center justify-center border'
                )}
                key={value}
              >
                {value}
              </div>
            )
          })}
        </div>
      </div>
      {completed && (
        <span className="text-xl font-medium text-green-400">Well done!</span>
      )}
    </div>
  )
}

export { App }
