# Preval test case

# parseint_arr3.md

> Try escaping > Parseint arr3
>
> Note: parseInt does coerce the arg to a string so we must consider it potentially observable unless primitive

## Input

`````js filename=intro
const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x = arr[0]; // We can detect the type as string (or primitive) and assert not observable
  $(x);
  try {
    const y = parseInt(x); // Cannot throw without second arg so move it up
    if (y) {
      const el = arr.shift();
      arr.push(el);
    } else {
      break;
    }
  } catch (e) {
    $('keepme');
  }
}
$(arr[0]);
`````


## Settled


`````js filename=intro
const arr /*:array*/ = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const x /*:primitive*/ = arr[0];
  $(x);
  const y /*:number*/ = $Number_parseInt(x);
  if (y) {
    const el /*:primitive*/ = $dotCall($array_shift, arr, `shift`);
    $dotCall($array_push, arr, `push`, el);
  } else {
    break;
  }
}
const tmpCalleeParam /*:primitive*/ = arr[0];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [`a`, `b`, `c`, `d`, `e`, `f`, `g`, `h`, `i`, `j`, `k`];
while (true) {
  const x = arr[0];
  $(x);
  if ($Number_parseInt(x)) {
    $dotCall($array_push, arr, `push`, $dotCall($array_shift, arr, `shift`));
  } else {
    break;
  }
}
$(arr[0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k" ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = a[ 0 ];
  $( b );
  const c = $Number_parseInt( b );
  if (c) {
    const d = $dotCall( $array_shift, a, "shift" );
    $dotCall( $array_push, a, "push", d );
  }
  else {
    break;
  }
}
const e = a[ 0 ];
$( e );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Number_parseInt
- (todo) access object property that also exists on prototype? $array_shift
- (todo) access object property that also exists on prototype? $array_push
- (todo) ExpressionStatement; how else might an array be used that we may want to support in phase1_1?
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
