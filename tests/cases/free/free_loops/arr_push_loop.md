# Preval test case

# arr_push_loop.md

> Free > Free loops > Arr push loop

Common obfuscation technique

## Input

`````js filename=intro
const tmpFree = function $free(f) {
  const a = $Number_parseInt(f);
  const c = a === 972654;
  return c;
};
const DATA_ARRAY = [`a`, 'b', `c`];
while (DATA_ARRAY[1] !== 'c') {
  const x = DATA_ARRAY[0];
  if (tmpFree(x)) {
    break;
  } else {
    DATA_ARRAY.push(DATA_ARRAY.shift()); // this fails differently
  }
}
$(DATA_ARRAY);
`````


## Settled


`````js filename=intro
const DATA_ARRAY /*:array*/ /*truthy*/ = [`b`, `c`, `a`];
$(DATA_ARRAY);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`b`, `c`, `a`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "b", "c", "a" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree = function $free($$0) {
  let f = $$0;
  debugger;
  const a = $Number_parseInt(f);
  const c = a === 972654;
  return c;
};
const DATA_ARRAY = [`a`, `b`, `c`];
while (true) {
  const tmpBinLhs = DATA_ARRAY[1];
  const tmpIfTest = tmpBinLhs !== `c`;
  if (tmpIfTest) {
    const x = DATA_ARRAY[0];
    const tmpIfTest$1 = tmpFree(x);
    if (tmpIfTest$1) {
      break;
    } else {
      const tmpMCF = DATA_ARRAY.push;
      const tmpMCF$1 = DATA_ARRAY.shift;
      const tmpMCP = $dotCall(tmpMCF$1, DATA_ARRAY, `shift`);
      $dotCall(tmpMCF, DATA_ARRAY, `push`, tmpMCP);
    }
  } else {
    break;
  }
}
$(DATA_ARRAY);
`````


## Todos triggered


- (todo) Missing implementation for allowed function call to:
- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_shift
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $Number_parseInt


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['b', 'c', 'a']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
