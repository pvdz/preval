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
$(1);
const tmpBinLhs$1 /*:primitive*/ = arr[2];
const test$1 /*:boolean*/ = tmpBinLhs$1 === 820304;
if (test$1) {
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
    $(1);
    const tmpBinLhs$2 /*:primitive*/ = arr[2];
    const test$2 /*:boolean*/ = tmpBinLhs$2 === 820304;
    if (test$2) {
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


## Todos triggered


- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice
- inline computed array property read


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
