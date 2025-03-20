# Preval test case

# case_complex.md

> Normalize > Switch > Case complex
>
> Normalize switches

Ideal output:

```js
if (1 === $(1)) {
  $(11);
  $(22);
} else if (1 === $(2)) {
  $(22);
}
```

## Input

`````js filename=intro
switch (1) {
  case $(1): $(11);
  case $(2): $(22);
}
`````


## Settled


`````js filename=intro
let tmpSwitchCaseToStart /*:number*/ = 2;
const tmpBinLhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinLhs === 1;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 /*:unknown*/ = $(2);
  const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$1 === 1;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
}
const tmpIfTest$3 /*:boolean*/ = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  $(11);
} else {
}
const tmpIfTest$5 /*:boolean*/ = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(22);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpSwitchCaseToStart = 2;
if ($(1) === 1) {
  tmpSwitchCaseToStart = 0;
} else {
  if ($(2) === 1) {
    tmpSwitchCaseToStart = 1;
  }
}
if (tmpSwitchCaseToStart <= 0) {
  $(11);
}
if (tmpSwitchCaseToStart <= 1) {
  $(22);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 2;
const b = $( 1 );
const c = b === 1;
if (c) {
  a = 0;
}
else {
  const d = $( 2 );
  const e = d === 1;
  if (e) {
    a = 1;
  }
}
const f = a <= 0;
if (f) {
  $( 11 );
}
const g = a <= 1;
if (g) {
  $( 22 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 11
 - 3: 22
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
