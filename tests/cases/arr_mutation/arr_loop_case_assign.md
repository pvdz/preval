# Preval test case

# arr_loop_case_assign.md

> Arr mutation > Arr loop case assign
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
  let test;
  try {
    test = arr[2] === 820304;
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
  $(test);
}

$(arr.slice(0, 3));
`````

## Pre Normal


`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
while (true) {
  $(1);
  let test;
  try {
    test = arr[2] === 820304;
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
  $(test);
}
$(arr.slice(0, 3));
`````

## Normalized


`````js filename=intro
const arr = [`one`, `two`, `three`, `four`, `five`];
while (true) {
  $(1);
  let test = undefined;
  try {
    const tmpBinLhs = arr[2];
    test = tmpBinLhs === 820304;
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
  $(test);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = arr.slice(0, 3);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(1);
const arr = [`two`, `three`, `four`, `five`, `one`];
const tmpCalleeParam = [`two`, `three`, `four`, `five`, `one`];
try {
  $(tmpCalleeParam);
} catch (e) {
  const v = arr.shift();
  arr.push(v);
}
$(false);
$(1);
const tmpBinLhs$1 = arr[2];
const tmpClusterSSA_test$1 = tmpBinLhs$1 === 820304;
if (tmpClusterSSA_test$1) {
} else {
  const next$1 = arr.shift();
  arr.push(next$1);
  const tmpCalleeParam$2 = arr.slice(0);
  try {
    $(tmpCalleeParam$2);
  } catch (e$1) {
    const v$1 = arr.shift();
    arr.push(v$1);
  }
  while ($LOOP_UNROLL_9) {
    $(false);
    $(1);
    const tmpBinLhs$2 = arr[2];
    const tmpClusterSSA_test$2 = tmpBinLhs$2 === 820304;
    if (tmpClusterSSA_test$2) {
      break;
    } else {
      const next$2 = arr.shift();
      arr.push(next$2);
      const tmpCalleeParam$3 = arr.slice(0);
      try {
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
const b = [ "two", "three", "four", "five", "one" ];
try {
  $( b );
}
catch (c) {
  const d = a.shift();
  a.push( d );
}
$( false );
$( 1 );
const e = a[ 2 ];
const f = e === 820304;
if (f) {

}
else {
  const g = a.shift();
  a.push( g );
  const h = a.slice( 0 );
  try {
    $( h );
  }
  catch (i) {
    const j = a.shift();
    a.push( j );
  }
  while ($LOOP_UNROLL_9) {
    $( false );
    $( 1 );
    const k = a[ 2 ];
    const l = k === 820304;
    if (l) {
      break;
    }
    else {
      const m = a.shift();
      a.push( m );
      const n = a.slice( 0 );
      try {
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
 - 3: false
 - 4: 1
 - 5: ['three', 'four', 'five', 'one', 'two']
 - 6: false
 - 7: 1
 - 8: ['four', 'five', 'one', 'two', 'three']
 - 9: false
 - 10: 1
 - 11: ['five', 'one', 'two', 'three', 'four']
 - 12: false
 - 13: 1
 - 14: ['one', 'two', 'three', 'four', 'five']
 - 15: false
 - 16: 1
 - 17: ['two', 'three', 'four', 'five', 'one']
 - 18: false
 - 19: 1
 - 20: ['three', 'four', 'five', 'one', 'two']
 - 21: false
 - 22: 1
 - 23: ['four', 'five', 'one', 'two', 'three']
 - 24: false
 - 25: 1
 - 26: ['five', 'one', 'two', 'three', 'four']
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
