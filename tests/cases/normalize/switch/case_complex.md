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

#TODO

## Input

`````js filename=intro
switch (1) {
  case $(1): $(11);
  case $(2): $(22);
}
`````

## Pre Normal

`````js filename=intro
{
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 2;
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if ($(2) === tmpSwitchValue) tmpSwitchCaseToStart = 1;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      $(11);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(22);
    }
  }
}
`````

## Normalized

`````js filename=intro
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  $(11);
} else {
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(22);
} else {
}
`````

## Output

`````js filename=intro
let tmpSwitchCaseToStart = 2;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === 1;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpBinLhs$1 = $(2);
  const tmpIfTest$1 = tmpBinLhs$1 === 1;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 1;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  $(11);
} else {
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$5) {
  $(22);
} else {
}
`````

## PST Output

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

## Result

Should call `$` with:
 - 1: 1
 - 2: 11
 - 3: 22
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
