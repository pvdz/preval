# Preval test case

# arr_loop_case.md

> Arr mutation > Arr loop case
>
>

## Input

`````js filename=intro
const arr = [
  `one`,
  `two`,
  `three`,
  `four`,
  `five`,
];
while (true) {
  $(1);
  try {
    const test = arr[2] === 820304;
    if (test) {
      break;
    } else {
      const next = arr.shift();
      arr.push(next);
      $(arr.slice(0));
    }
  } catch (e) {
    const v = arr.shift();
    arr.push(v);
  }
}

$(arr.slice(0, 3));
`````

## Pre Normal


`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
while (true) {
  $(1);
  try {
    const test = arr[2] === 820304;
    if (test) {
      break;
    } else {
      const next = arr.shift();
      arr.push(next);
      $(arr.slice(0));
    }
  } catch (e) {
    const v = arr.shift();
    arr.push(v);
  }
}
$(arr.slice(0, 3));
`````

## Normalized


`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
while (true) {
  $(1);
  try {
    const tmpBinLhs = arr[2];
    const test = tmpBinLhs === 820304;
    if (test) {
      break;
    } else {
      const next = arr.shift();
      arr.push(next);
      const tmpCallCallee = $;
      const tmpCalleeParam = arr.slice(0);
      tmpCallCallee(tmpCalleeParam);
    }
  } catch (e) {
    const v = arr.shift();
    arr.push(v);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = arr.slice(0, 3);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(1);
const arr = [`two`, `three`, `four`, `five`, `one`];
try {
  const tmpCalleeParam = [`two`, `three`, `four`, `five`, `one`];
  $(tmpCalleeParam);
} catch (e) {
  const v = arr.shift();
  arr.push(v);
}
$(1);
const tmpBinLhs$1 = arr[2];
const test$1 = tmpBinLhs$1 === 820304;
if (test$1) {
} else {
  const next$1 = arr.shift();
  arr.push(next$1);
  try {
    const tmpCalleeParam$2 = arr.slice(0);
    $(tmpCalleeParam$2);
  } catch (e$1) {
    const v$1 = arr.shift();
    arr.push(v$1);
  }
  while ($LOOP_UNROLL_9) {
    $(1);
    const tmpBinLhs$2 = arr[2];
    const test$2 = tmpBinLhs$2 === 820304;
    if (test$2) {
      break;
    } else {
      const next$2 = arr.shift();
      arr.push(next$2);
      try {
        const tmpCalleeParam$3 = arr.slice(0);
        $(tmpCalleeParam$3);
      } catch (e$2) {
        const v$2 = arr.shift();
        arr.push(v$2);
      }
    }
  }
}
const tmpCalleeParam$1 = arr.slice(0, 3);
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
const a = [ "two", "three", "four", "five", "one" ];
try {
  const b = [ "two", "three", "four", "five", "one" ];
  $( b );
}
catch (c) {
  const d = a.shift();
  a.push( d );
}
$( 1 );
const e = a[ 2 ];
const f = e === 820304;
if (f) {

}
else {
  const g = a.shift();
  a.push( g );
  try {
    const h = a.slice( 0 );
    $( h );
  }
  catch (i) {
    const j = a.shift();
    a.push( j );
  }
  while ($LOOP_UNROLL_9) {
    $( 1 );
    const k = a[ 2 ];
    const l = k === 820304;
    if (l) {
      break;
    }
    else {
      const m = a.shift();
      a.push( m );
      try {
        const n = a.slice( 0 );
        $( n );
      }
      catch (o) {
        const p = a.shift();
        a.push( p );
      }
    }
  }
}
const q = a.slice( 0, 3 );
$( q );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: ['two', 'three', 'four', 'five', 'one']
 - 3: 1
 - 4: ['three', 'four', 'five', 'one', 'two']
 - 5: 1
 - 6: ['four', 'five', 'one', 'two', 'three']
 - 7: 1
 - 8: ['five', 'one', 'two', 'three', 'four']
 - 9: 1
 - 10: ['one', 'two', 'three', 'four', 'five']
 - 11: 1
 - 12: ['two', 'three', 'four', 'five', 'one']
 - 13: 1
 - 14: ['three', 'four', 'five', 'one', 'two']
 - 15: 1
 - 16: ['four', 'five', 'one', 'two', 'three']
 - 17: 1
 - 18: ['five', 'one', 'two', 'three', 'four']
 - 19: 1
 - 20: ['one', 'two', 'three', 'four', 'five']
 - 21: 1
 - 22: ['two', 'three', 'four', 'five', 'one']
 - 23: 1
 - 24: ['three', 'four', 'five', 'one', 'two']
 - 25: 1
 - 26: ['four', 'five', 'one', 'two', 'three']
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
