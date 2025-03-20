# Preval test case

# arr_parseint.md

> Try escaping > Arr parseint
>
> Typical rotation obfuscation.

const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
while (true) {
  try {
    const a = arr[286];
    const b = parseInt(a);
    if (b) {
      break;
    } else {
      const M = arr.shift();
      arr.push(M);
    }
  } catch (P) {
    const N = arr.shift();
    arr.push(N);
  }
}

## Input

`````js filename=intro
{
  const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(arr[0]);
    try {
      const a = arr[286];
      // This statement can only be lifted if it can guarantee a is a primitive or builtin
      // That means having to infer the type of `arr[num]` for an unknown number (or rather, 
      // unknown what index that actually represents in a loop)
      // The push/pop "pump" is part of that pattern in an obfuscator.
      const b = parseInt(a);
      if (b) {
        break;
      } else {
        // It should be possible, however specific edge case, to infer that this push/pop
        // can never introduce a new type to the array (assuming undefined is implicitly
        // already part of it). After that, we can infer that the array is string/undefined.
        // (Bonus points for including something like i<arr.length to remove undefined)
        const M = arr.shift();
        arr.push(M);
      }
    } catch (P) {
      const N = arr.shift();
      arr.push(N);
    }
  }
  $(arr);
}
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam /*:primitive*/ = arr[0];
  $(tmpCalleeParam);
  const a /*:primitive*/ = arr[286];
  const b /*:number*/ = parseInt(a);
  if (b) {
    break;
  } else {
    const M /*:unknown*/ = arr.shift();
    arr.push(M);
  }
}
$(arr);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  $(arr[0]);
  if (parseInt(arr[286])) {
    break;
  } else {
    arr.push(arr.shift());
  }
}
$(arr);
`````

## Pre Normal


`````js filename=intro
{
  const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(arr[0]);
    try {
      const a = arr[286];
      const b = parseInt(a);
      if (b) {
        break;
      } else {
        const M = arr.shift();
        arr.push(M);
      }
    } catch (P) {
      const N = arr.shift();
      arr.push(N);
    }
  }
  $(arr);
}
`````

## Normalized


`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam = arr[0];
  $(tmpCalleeParam);
  try {
    const a = arr[286];
    const b = parseInt(a);
    if (b) {
      break;
    } else {
      const M = arr.shift();
      arr.push(M);
    }
  } catch (P) {
    const N = arr.shift();
    arr.push(N);
  }
}
$(arr);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  $( b );
  const c = a[ 286 ];
  const d = parseInt( c );
  if (d) {
    break;
  }
  else {
    const e = a.shift();
    a.push( e );
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - 3: 'c'
 - 4: 'd'
 - 5: 'e'
 - 6: 'f'
 - 7: 'g'
 - 8: 'h'
 - 9: 'i'
 - 10: 'j'
 - 11: 'k'
 - 12: 'a'
 - 13: 'b'
 - 14: 'c'
 - 15: 'd'
 - 16: 'e'
 - 17: 'f'
 - 18: 'g'
 - 19: 'h'
 - 20: 'i'
 - 21: 'j'
 - 22: 'k'
 - 23: 'a'
 - 24: 'b'
 - 25: 'c'
 - 26: 'd'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
