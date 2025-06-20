# Preval test case

# early_return4.md

> Normalize > Switch > Early return4
>
> Sorting out the branching stuff

(This is the intermediate step without if-else branch reduction + regression shortening)

## Input

`````js filename=intro
let f = function () {
  const tmpIfTest = 0;
  if (tmpIfTest) {
    $('a')
  } else {
    const tmpIfTest$1 = 1;
    if (tmpIfTest$1) {
      $('b')
    } else {
      const tmpIfTest$2 = 2;
      if (tmpIfTest$2) {
        $('c')
      }
    }
    $('after inner');
  }
  $('after outer');
};
f();
`````


## Settled


`````js filename=intro
$(`b`);
$(`after inner`);
$(`after outer`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`b`);
$(`after inner`);
$(`after outer`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "b" );
$( "after inner" );
$( "after outer" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = 0;
  if (tmpIfTest) {
    $(`a`);
    $(`after outer`);
    return undefined;
  } else {
    const tmpIfTest$1 = 1;
    if (tmpIfTest$1) {
      $(`b`);
      $(`after inner`);
      $(`after outer`);
      return undefined;
    } else {
      const tmpIfTest$2 = 2;
      if (tmpIfTest$2) {
        $(`c`);
        $(`after inner`);
        $(`after outer`);
        return undefined;
      } else {
        $(`after inner`);
        $(`after outer`);
        return undefined;
      }
    }
  }
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'b'
 - 2: 'after inner'
 - 3: 'after outer'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
