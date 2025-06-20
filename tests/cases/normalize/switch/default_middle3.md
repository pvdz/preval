# Preval test case

# default_middle3.md

> Normalize > Switch > Default middle3
>
> Normalize switches

```js
const test = 6;
let n = 0;
if (test === $(30)) n = 1;
else if (test === $(31)) n = 2;
else if (test === $(32)) n = 3;

foo: {
  if (a <= 1) $('a');
  if (a === 0) $('d');
  if (a <= 2) $('b');
  if (a <= 3) $('c');
}
```

## Input

`````js filename=intro
switch ($(30)) {
  case $(30): $('a');
  default: $('b') 
  case $(31): $('c');
  case $(32): $('d');
}
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(30);
let tmpSwitchCaseToStart /*:number*/ = 1;
const tmpBinLhs /*:unknown*/ = $(30);
const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 /*:unknown*/ = $(31);
  const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
    const tmpBinLhs$3 /*:unknown*/ = $(32);
    const tmpIfTest$3 /*:boolean*/ = tmpBinLhs$3 === tmpSwitchValue;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 3;
    } else {
    }
  }
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$5) {
  $(`a`);
} else {
}
const tmpIfTest$7 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$7) {
  $(`b`);
} else {
}
const tmpIfTest$9 /*:boolean*/ = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$9) {
  $(`c`);
  $(`d`);
} else {
  $(`d`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(30);
let tmpSwitchCaseToStart = 1;
if ($(30) === tmpSwitchValue) {
  tmpSwitchCaseToStart = 0;
} else {
  if ($(31) === tmpSwitchValue) {
    tmpSwitchCaseToStart = 2;
  } else {
    if ($(32) === tmpSwitchValue) {
      tmpSwitchCaseToStart = 3;
    }
  }
}
if (tmpSwitchCaseToStart <= 0) {
  $(`a`);
}
if (tmpSwitchCaseToStart <= 1) {
  $(`b`);
}
if (tmpSwitchCaseToStart <= 2) {
  $(`c`);
  $(`d`);
} else {
  $(`d`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
let b = 1;
const c = $( 30 );
const d = c === a;
if (d) {
  b = 0;
}
else {
  const e = $( 31 );
  const f = e === a;
  if (f) {
    b = 2;
  }
  else {
    const g = $( 32 );
    const h = g === a;
    if (h) {
      b = 3;
    }
  }
}
const i = b <= 0;
if (i) {
  $( "a" );
}
const j = b <= 1;
if (j) {
  $( "b" );
}
const k = b <= 2;
if (k) {
  $( "c" );
  $( "d" );
}
else {
  $( "d" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpSwitchValue = $(30);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(30);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(31);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
    const tmpBinLhs$3 = $(32);
    const tmpIfTest$3 = tmpBinLhs$3 === tmpSwitchValue;
    if (tmpIfTest$3) {
      tmpSwitchCaseToStart = 3;
    } else {
    }
  }
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$5) {
  $(`a`);
} else {
}
const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$7) {
  $(`b`);
} else {
}
const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$9) {
  $(`c`);
} else {
}
const tmpIfTest$11 = tmpSwitchCaseToStart <= 3;
if (tmpIfTest$11) {
  $(`d`);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 30
 - 2: 30
 - 3: 'a'
 - 4: 'b'
 - 5: 'c'
 - 6: 'd'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
