# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Switch w default case block > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      (10, 20, $(30)) ? $(2) : $($(100));
    }
    break;
  default:
    $("fail1");
  case 2:
    $("fail2");
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 1;
  if ($(1) === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      {
        (10, 20, $(30)) ? $(2) : $($(100));
      }
      break tmpSwitchBreak;
    }
    if (tmpSwitchCaseToStart <= 1) {
      $(`fail1`);
    }
    if (tmpSwitchCaseToStart <= 2) {
      $(`fail2`);
    }
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
tmpSwitchBreak: {
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  } else {
    const tmpIfTest$1 = 2 === tmpSwitchValue;
    if (tmpIfTest$1) {
      tmpSwitchCaseToStart = 2;
    } else {
    }
  }
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    const tmpIfTest$5 = $(30);
    if (tmpIfTest$5) {
      $(2);
    } else {
      const tmpCallCallee = $;
      const tmpCalleeParam = $(100);
      tmpCallCallee(tmpCalleeParam);
    }
    break tmpSwitchBreak;
  } else {
    const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
    if (tmpIfTest$7) {
      $(`fail1`);
    } else {
    }
    const tmpIfTest$9 = tmpSwitchCaseToStart <= 2;
    if (tmpIfTest$9) {
      $(`fail2`);
    } else {
    }
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $(1);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$3) {
  const tmpIfTest$5 = $(30);
  if (tmpIfTest$5) {
    $(2);
  } else {
    const tmpCalleeParam = $(100);
    $(tmpCalleeParam);
  }
} else {
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$7) {
    $(`fail1`);
  } else {
  }
  $(`fail2`);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = 1;
const c = $( 1 );
const d = c === a;
if (d) {
  b = 0;
}
else {
  const e = 2 === a;
  if (e) {
    b = 2;
  }
}
const f = b <= 0;
if (f) {
  const g = $( 30 );
  if (g) {
    $( 2 );
  }
  else {
    const h = $( 100 );
    $( h );
  }
}
else {
  const i = b <= 1;
  if (i) {
    $( "fail1" );
  }
  $( "fail2" );
}
const j = {
  a: 999,
  b: 1000,
};
$( j );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 30
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
