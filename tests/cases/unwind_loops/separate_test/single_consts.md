# Preval test case

# single_consts.md

> Unwind loops > Separate test > Single consts
>
> From react

## Input

`````js filename=intro
const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const len = arr.length;
const max = $(10);
let counter = 2;
let test = 2 < max;
while (test) {
  const tmpCalleeParam$1891 = arr[counter];
  $(tmpCalleeParam$1891);
  counter = counter + 1;
  test = counter < len;
}
`````

## Pre Normal


`````js filename=intro
const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const len = arr.length;
const max = $(10);
let counter = 2;
let test = 2 < max;
while (test) {
  const tmpCalleeParam$1891 = arr[counter];
  $(tmpCalleeParam$1891);
  counter = counter + 1;
  test = counter < len;
}
`````

## Normalized


`````js filename=intro
const arr = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
const len = arr.length;
const max = $(10);
let counter = 2;
let test = 2 < max;
while (true) {
  if (test) {
    const tmpCalleeParam$1891 = arr[counter];
    $(tmpCalleeParam$1891);
    counter = counter + 1;
    test = counter < len;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const max /*:unknown*/ = $(10);
const test /*:boolean*/ = 2 < max;
if (test) {
  $(103);
  let tmpClusterSSA_counter /*:number*/ = 3;
  let tmpClusterSSA_test /*:boolean*/ = true;
  const arr /*:array*/ = [101, 102, 103, 104, 105, 106, 107, 108, 109, 1010];
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_test) {
      const tmpCalleeParam$1 /*:primitive*/ = arr[tmpClusterSSA_counter];
      $(tmpCalleeParam$1);
      tmpClusterSSA_counter = tmpClusterSSA_counter + 1;
      tmpClusterSSA_test = tmpClusterSSA_counter < 10;
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
const b = 2 < a;
if (b) {
  $( 103 );
  let c = 3;
  let d = true;
  const e = [ 101, 102, 103, 104, 105, 106, 107, 108, 109, 1010 ];
  while ($LOOP_UNROLL_10) {
    if (d) {
      const f = e[ c ];
      $( f );
      c = c + 1;
      d = c < 10;
    }
    else {
      break;
    }
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 103
 - 3: 104
 - 4: 105
 - 5: 106
 - 6: 107
 - 7: 108
 - 8: 109
 - 9: 1010
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
