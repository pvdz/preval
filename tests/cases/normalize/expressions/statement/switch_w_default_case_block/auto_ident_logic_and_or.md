# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Switch w default case block > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    {
      ($($(1)) && $($(1))) || $($(2));
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
        ($($(1)) && $($(1))) || $($(2));
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
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  } else {
  }
}
tmpSwitchBreak: {
  const tmpIfTest$3 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$3) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    let tmpIfTest$5 = tmpCallCallee(tmpCalleeParam);
    if (tmpIfTest$5) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(1);
      tmpIfTest$5 = tmpCallCallee$1(tmpCalleeParam$1);
    } else {
    }
    if (tmpIfTest$5) {
    } else {
      const tmpCallCallee$3 = $;
      const tmpCalleeParam$3 = $(2);
      tmpCallCallee$3(tmpCalleeParam$3);
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
const a = { a: 999, b: 1000 };
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
  const tmpCalleeParam = $(1);
  let tmpIfTest$5 = $(tmpCalleeParam);
  if (tmpIfTest$5) {
    const tmpCalleeParam$1 = $(1);
    tmpIfTest$5 = $(tmpCalleeParam$1);
  } else {
  }
  if (tmpIfTest$5) {
  } else {
    const tmpCalleeParam$3 = $(2);
    $(tmpCalleeParam$3);
  }
} else {
  const tmpIfTest$7 = tmpSwitchCaseToStart <= 1;
  if (tmpIfTest$7) {
    $(`fail1`);
  } else {
  }
  $(`fail2`);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
let c = 1;
const d = $( 1 );
const e = d === b;
if (e) {
  c = 0;
}
else {
  const f = 2 === b;
  if (f) {
    c = 2;
  }
}
const g = c <= 0;
if (g) {
  const h = $( 1 );
  let i = $( h );
  if (i) {
    const j = $( 1 );
    i = $( j );
  }
  if (i) {

  }
  else {
    const k = $( 2 );
    $( k );
  }
}
else {
  const l = c <= 1;
  if (l) {
    $( "fail1" );
  }
  $( "fail2" );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
