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
loopStop$1: {
  try {
    const tmpCalleeParam = [`two`, `three`, `four`, `five`, `one`];
    $(tmpCalleeParam);
  } catch (e) {
    const v = arr.shift();
    arr.push(v);
  }
  $(1);
  try {
    const tmpBinLhs$1 = arr[2];
    const test$1 = tmpBinLhs$1 === 820304;
    if (test$1) {
      break loopStop$1;
    } else {
      const next$1 = arr.shift();
      arr.push(next$1);
      const tmpCalleeParam$2 = arr.slice(0);
      $(tmpCalleeParam$2);
    }
  } catch (e$1) {
    const v$1 = arr.shift();
    arr.push(v$1);
  }
  $(1);
  try {
    const tmpBinLhs$2 = arr[2];
    const test$2 = tmpBinLhs$2 === 820304;
    if (test$2) {
      break loopStop$1;
    } else {
      const next$2 = arr.shift();
      arr.push(next$2);
      const tmpCalleeParam$3 = arr.slice(0);
      $(tmpCalleeParam$3);
    }
  } catch (e$2) {
    const v$2 = arr.shift();
    arr.push(v$2);
  }
  $(1);
  try {
    const tmpBinLhs$3 = arr[2];
    const test$3 = tmpBinLhs$3 === 820304;
    if (test$3) {
      break loopStop$1;
    } else {
      const next$3 = arr.shift();
      arr.push(next$3);
      const tmpCalleeParam$4 = arr.slice(0);
      $(tmpCalleeParam$4);
    }
  } catch (e$3) {
    const v$3 = arr.shift();
    arr.push(v$3);
  }
  $(1);
  try {
    const tmpBinLhs$4 = arr[2];
    const test$4 = tmpBinLhs$4 === 820304;
    if (test$4) {
      break loopStop$1;
    } else {
      const next$4 = arr.shift();
      arr.push(next$4);
      const tmpCalleeParam$5 = arr.slice(0);
      $(tmpCalleeParam$5);
    }
  } catch (e$4) {
    const v$4 = arr.shift();
    arr.push(v$4);
  }
  $(1);
  try {
    const tmpBinLhs$5 = arr[2];
    const test$5 = tmpBinLhs$5 === 820304;
    if (test$5) {
      break loopStop$1;
    } else {
      const next$5 = arr.shift();
      arr.push(next$5);
      const tmpCalleeParam$6 = arr.slice(0);
      $(tmpCalleeParam$6);
    }
  } catch (e$5) {
    const v$5 = arr.shift();
    arr.push(v$5);
  }
  $(1);
  try {
    const tmpBinLhs$6 = arr[2];
    const test$6 = tmpBinLhs$6 === 820304;
    if (test$6) {
      break loopStop$1;
    } else {
      const next$6 = arr.shift();
      arr.push(next$6);
      const tmpCalleeParam$7 = arr.slice(0);
      $(tmpCalleeParam$7);
    }
  } catch (e$6) {
    const v$6 = arr.shift();
    arr.push(v$6);
  }
  $(1);
  try {
    const tmpBinLhs$7 = arr[2];
    const test$7 = tmpBinLhs$7 === 820304;
    if (test$7) {
      break loopStop$1;
    } else {
      const next$7 = arr.shift();
      arr.push(next$7);
      const tmpCalleeParam$8 = arr.slice(0);
      $(tmpCalleeParam$8);
    }
  } catch (e$7) {
    const v$7 = arr.shift();
    arr.push(v$7);
  }
  $(1);
  try {
    const tmpBinLhs$8 = arr[2];
    const test$8 = tmpBinLhs$8 === 820304;
    if (test$8) {
      break loopStop$1;
    } else {
      const next$8 = arr.shift();
      arr.push(next$8);
      const tmpCalleeParam$9 = arr.slice(0);
      $(tmpCalleeParam$9);
    }
  } catch (e$8) {
    const v$8 = arr.shift();
    arr.push(v$8);
  }
  $(1);
  try {
    const tmpBinLhs$9 = arr[2];
    const test$9 = tmpBinLhs$9 === 820304;
    if (test$9) {
      break loopStop$1;
    } else {
      const next$9 = arr.shift();
      arr.push(next$9);
      const tmpCalleeParam$10 = arr.slice(0);
      $(tmpCalleeParam$10);
    }
  } catch (e$9) {
    const v$9 = arr.shift();
    arr.push(v$9);
  }
  $(1);
  try {
    const tmpBinLhs$10 = arr[2];
    const test$10 = tmpBinLhs$10 === 820304;
    if (test$10) {
      break loopStop$1;
    } else {
      const next$10 = arr.shift();
      arr.push(next$10);
      const tmpCalleeParam$11 = arr.slice(0);
      $(tmpCalleeParam$11);
    }
  } catch (e$10) {
    const v$10 = arr.shift();
    arr.push(v$10);
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(1);
    try {
      const tmpBinLhs$11 = arr[2];
      const test$11 = tmpBinLhs$11 === 820304;
      if (test$11) {
        break;
      } else {
        const next$11 = arr.shift();
        arr.push(next$11);
        const tmpCalleeParam$12 = arr.slice(0);
        $(tmpCalleeParam$12);
      }
    } catch (e$11) {
      const v$11 = arr.shift();
      arr.push(v$11);
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
loopStop$1: {
  try {
    const b = [ "two", "three", "four", "five", "one" ];
    $( b );
  }
  catch (c) {
    const d = a.shift();
    a.push( d );
  }
  $( 1 );
  try {
    const e = a[ 2 ];
    const f = e === 820304;
    if (f) {
      break loopStop$1;
    }
    else {
      const g = a.shift();
      a.push( g );
      const h = a.slice( 0 );
      $( h );
    }
  }
  catch (i) {
    const j = a.shift();
    a.push( j );
  }
  $( 1 );
  try {
    const k = a[ 2 ];
    const l = k === 820304;
    if (l) {
      break loopStop$1;
    }
    else {
      const m = a.shift();
      a.push( m );
      const n = a.slice( 0 );
      $( n );
    }
  }
  catch (o) {
    const p = a.shift();
    a.push( p );
  }
  $( 1 );
  try {
    const q = a[ 2 ];
    const r = q === 820304;
    if (r) {
      break loopStop$1;
    }
    else {
      const s = a.shift();
      a.push( s );
      const t = a.slice( 0 );
      $( t );
    }
  }
  catch (u) {
    const v = a.shift();
    a.push( v );
  }
  $( 1 );
  try {
    const w = a[ 2 ];
    const x = w === 820304;
    if (x) {
      break loopStop$1;
    }
    else {
      const y = a.shift();
      a.push( y );
      const z = a.slice( 0 );
      $( z );
    }
  }
  catch (01) {
    const 11 = a.shift();
    a.push( 11 );
  }
  $( 1 );
  try {
    const 21 = a[ 2 ];
    const 31 = 21 === 820304;
    if (31) {
      break loopStop$1;
    }
    else {
      const 41 = a.shift();
      a.push( 41 );
      const 51 = a.slice( 0 );
      $( 51 );
    }
  }
  catch (61) {
    const 71 = a.shift();
    a.push( 71 );
  }
  $( 1 );
  try {
    const 81 = a[ 2 ];
    const 91 = 81 === 820304;
    if (91) {
      break loopStop$1;
    }
    else {
      const a1 = a.shift();
      a.push( a1 );
      const b1 = a.slice( 0 );
      $( b1 );
    }
  }
  catch (c1) {
    const d1 = a.shift();
    a.push( d1 );
  }
  $( 1 );
  try {
    const e1 = a[ 2 ];
    const f1 = e1 === 820304;
    if (f1) {
      break loopStop$1;
    }
    else {
      const g1 = a.shift();
      a.push( g1 );
      const h1 = a.slice( 0 );
      $( h1 );
    }
  }
  catch (i1) {
    const j1 = a.shift();
    a.push( j1 );
  }
  $( 1 );
  try {
    const k1 = a[ 2 ];
    const l1 = k1 === 820304;
    if (l1) {
      break loopStop$1;
    }
    else {
      const m1 = a.shift();
      a.push( m1 );
      const n1 = a.slice( 0 );
      $( n1 );
    }
  }
  catch (o1) {
    const p1 = a.shift();
    a.push( p1 );
  }
  $( 1 );
  try {
    const q1 = a[ 2 ];
    const r1 = q1 === 820304;
    if (r1) {
      break loopStop$1;
    }
    else {
      const s1 = a.shift();
      a.push( s1 );
      const t1 = a.slice( 0 );
      $( t1 );
    }
  }
  catch (u1) {
    const v1 = a.shift();
    a.push( v1 );
  }
  $( 1 );
  try {
    const w1 = a[ 2 ];
    const x1 = w1 === 820304;
    if (x1) {
      break loopStop$1;
    }
    else {
      const y1 = a.shift();
      a.push( y1 );
      const z1 = a.slice( 0 );
      $( z1 );
    }
  }
  catch (02) {
    const 12 = a.shift();
    a.push( 12 );
  }
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 1 );
    try {
      const 22 = a[ 2 ];
      const 32 = 22 === 820304;
      if (32) {
        break;
      }
      else {
        const 42 = a.shift();
        a.push( 42 );
        const 52 = a.slice( 0 );
        $( 52 );
      }
    }
    catch (62) {
      const 72 = a.shift();
      a.push( 72 );
    }
  }
}
const 82 = a.slice( 0, 3 );
$( 82 );
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
