# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident cond c-seq simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = (10, 20, $(30)) ? $(2) : $($(100));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Pre Normal

`````js filename=intro
{
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  if (1 === tmpSwitchValue) tmpSwitchCaseToStart = 0;
  else if (2 === tmpSwitchValue) tmpSwitchCaseToStart = 2;
  else;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a = (10, 20, $(30)) ? $(2) : $($(100));
      $(a);
    }
    if (tmpSwitchCaseToStart <= 1) {
      $('fail1');
    }
    if (tmpSwitchCaseToStart <= 2) {
      $('fail2');
    }
  }
}
`````

## Normalized

`````js filename=intro
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
  const tmpIfTest$1 = 2 === tmpSwitchValue;
  if (tmpIfTest$1) {
    tmpSwitchCaseToStart = 2;
  }
}
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  const tmpIfTest$3 = $(30);
  if (tmpIfTest$3) {
    a = $(2);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    a = tmpCallCallee(tmpCalleeParam);
  }
  $(a);
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$4) {
  $('fail1');
}
const tmpIfTest$5 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$5) {
  $('fail2');
}
`````

## Output

`````js filename=intro
let a;
const tmpIfTest$3 = $(30);
if (tmpIfTest$3) {
  a = $(2);
} else {
  const tmpCalleeParam = $(100);
  a = $(tmpCalleeParam);
}
$(a);
$('fail1');
$('fail2');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 30
 - 2: 2
 - 3: 2
 - 4: 'fail1'
 - 5: 'fail2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
