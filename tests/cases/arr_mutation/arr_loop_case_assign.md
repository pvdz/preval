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

## Settled


`````js filename=intro
$(1);
const tmpCalleeParam /*:array*/ = [`two`, `three`, `four`, `five`, `one`];
const arr /*:array*/ = [`two`, `three`, `four`, `five`, `one`];
try {
  $(tmpCalleeParam);
} catch (e) {
  const v /*:unknown*/ = arr.shift();
  arr.push(v);
}
$(false);
$(1);
const tmpBinLhs$1 /*:primitive*/ = arr[2];
const tmpClusterSSA_test$1 /*:boolean*/ = tmpBinLhs$1 === 820304;
if (tmpClusterSSA_test$1) {
} else {
  const next$1 /*:unknown*/ = arr.shift();
  arr.push(next$1);
  const tmpCalleeParam$2 /*:array*/ = arr.slice(0);
  try {
    $(tmpCalleeParam$2);
  } catch (e$1) {
    const v$1 /*:unknown*/ = arr.shift();
    arr.push(v$1);
  }
  while ($LOOP_UNROLL_9) {
    $(false);
    $(1);
    const tmpBinLhs$2 /*:primitive*/ = arr[2];
    const tmpClusterSSA_test$2 /*:boolean*/ = tmpBinLhs$2 === 820304;
    if (tmpClusterSSA_test$2) {
      break;
    } else {
      const next$2 /*:unknown*/ = arr.shift();
      arr.push(next$2);
      const tmpCalleeParam$3 /*:array*/ = arr.slice(0);
      try {
        $(tmpCalleeParam$3);
      } catch (e$2) {
        const v$2 /*:unknown*/ = arr.shift();
        arr.push(v$2);
      }
    }
  }
}
const tmpCalleeParam$1 /*:array*/ = arr.slice(0, 3);
$(tmpCalleeParam$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpCalleeParam = [`two`, `three`, `four`, `five`, `one`];
const arr = [`two`, `three`, `four`, `five`, `one`];
try {
  $(tmpCalleeParam);
} catch (e) {
  arr.push(arr.shift());
}
$(false);
$(1);
if (!(arr[2] === 820304)) {
  arr.push(arr.shift());
  const tmpCalleeParam$2 = arr.slice(0);
  try {
    $(tmpCalleeParam$2);
  } catch (e$1) {
    arr.push(arr.shift());
  }
  while (true) {
    $(false);
    $(1);
    if (arr[2] === 820304) {
      break;
    } else {
      arr.push(arr.shift());
      const tmpCalleeParam$3 = arr.slice(0);
      try {
        $(tmpCalleeParam$3);
      } catch (e$2) {
        arr.push(arr.shift());
      }
    }
  }
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
      const tmpCalleeParam = arr.slice(0);
      $(tmpCalleeParam);
    }
  } catch (e) {
    const v = arr.shift();
    arr.push(v);
  }
  $(test);
}
const tmpCalleeParam$1 = arr.slice(0, 3);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = [ "two", "three", "four", "five", "one" ];
const b = [ "two", "three", "four", "five", "one" ];
try {
  $( a );
}
catch (c) {
  const d = b.shift();
  b.push( d );
}
$( false );
$( 1 );
const e = b[ 2 ];
const f = e === 820304;
if (f) {

}
else {
  const g = b.shift();
  b.push( g );
  const h = b.slice( 0 );
  try {
    $( h );
  }
  catch (i) {
    const j = b.shift();
    b.push( j );
  }
  while ($LOOP_UNROLL_9) {
    $( false );
    $( 1 );
    const k = b[ 2 ];
    const l = k === 820304;
    if (l) {
      break;
    }
    else {
      const m = b.shift();
      b.push( m );
      const n = b.slice( 0 );
      try {
        $( n );
      }
      catch (o) {
        const p = b.shift();
        b.push( p );
      }
    }
  }
}
const q = b.slice( 0, 3 );
$( q );
`````

## Globals

None

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_push
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_slice
