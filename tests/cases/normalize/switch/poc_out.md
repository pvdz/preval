# Preval test case

# poc_out.md

> Normalize > Switch > Poc out
>
> Just a thought

For something like

```js
switch (x) {
 case $(1):
   $('A');
 case $(2):
   $('B');
   break;
 case $(3):
   $('C');
   break;
}
```

## Input

`````js filename=intro
let x;
let fallthrough = false;
exit: {
  if (fallthrough || x === $(1)) {
    {
      $('A');
    }
    fallthrough = true;
  }
  if (fallthrough || x === $(2)) {
    {
      $('B');
      break exit;
    }
    fallthrough = true;
  }
  if (fallthrough || x === $(3)) {
    {
      $('C');
      break exit;
    }
    fallthrough = true;
  }
}
`````

## Settled


`````js filename=intro
let fallthrough /*:boolean*/ = false;
const tmpBinBothRhs /*:unknown*/ = $(1);
let tmpIfTest$1 /*:boolean*/ = true;
const tmpIfTest /*:boolean*/ = undefined === tmpBinBothRhs;
if (tmpIfTest) {
  $(`A`);
  fallthrough = true;
} else {
  const tmpBinBothRhs$1 /*:unknown*/ = $(2);
  tmpIfTest$1 = undefined === tmpBinBothRhs$1;
}
if (tmpIfTest$1) {
  $(`B`);
} else {
  let tmpIfTest$3 /*:unknown*/ = fallthrough;
  if (fallthrough) {
  } else {
    const tmpBinBothRhs$3 /*:unknown*/ = $(3);
    tmpIfTest$3 = undefined === tmpBinBothRhs$3;
  }
  if (tmpIfTest$3) {
    $(`C`);
  } else {
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let fallthrough = false;
const tmpBinBothRhs = $(1);
let tmpIfTest$1 = true;
if (undefined === tmpBinBothRhs) {
  $(`A`);
  fallthrough = true;
} else {
  tmpIfTest$1 = undefined === $(2);
}
if (tmpIfTest$1) {
  $(`B`);
} else {
  let tmpIfTest$3 = fallthrough;
  if (!fallthrough) {
    tmpIfTest$3 = undefined === $(3);
  }
  if (tmpIfTest$3) {
    $(`C`);
  }
}
`````

## Pre Normal


`````js filename=intro
let x;
let fallthrough = false;
exit: {
  if (fallthrough || x === $(1)) {
    {
      $(`A`);
    }
    fallthrough = true;
  }
  if (fallthrough || x === $(2)) {
    {
      $(`B`);
      break exit;
    }
    fallthrough = true;
  }
  if (fallthrough || x === $(3)) {
    {
      $(`C`);
      break exit;
    }
    fallthrough = true;
  }
}
`````

## Normalized


`````js filename=intro
let x = undefined;
let fallthrough = false;
exit: {
  let tmpIfTest = fallthrough;
  if (tmpIfTest) {
  } else {
    const tmpBinBothLhs = x;
    const tmpBinBothRhs = $(1);
    tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  }
  if (tmpIfTest) {
    $(`A`);
    fallthrough = true;
  } else {
  }
  let tmpIfTest$1 = fallthrough;
  if (tmpIfTest$1) {
  } else {
    const tmpBinBothLhs$1 = x;
    const tmpBinBothRhs$1 = $(2);
    tmpIfTest$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
  }
  if (tmpIfTest$1) {
    $(`B`);
    break exit;
  } else {
    let tmpIfTest$3 = fallthrough;
    if (tmpIfTest$3) {
    } else {
      const tmpBinBothLhs$3 = x;
      const tmpBinBothRhs$3 = $(3);
      tmpIfTest$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
    }
    if (tmpIfTest$3) {
      $(`C`);
      break exit;
    } else {
    }
  }
}
`````

## PST Settled
With rename=true

`````js filename=intro
let a = false;
const b = $( 1 );
let c = true;
const d = undefined === b;
if (d) {
  $( "A" );
  a = true;
}
else {
  const e = $( 2 );
  c = undefined === e;
}
if (c) {
  $( "B" );
}
else {
  let f = a;
  if (a) {

  }
  else {
    const g = $( 3 );
    f = undefined === g;
  }
  if (f) {
    $( "C" );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
