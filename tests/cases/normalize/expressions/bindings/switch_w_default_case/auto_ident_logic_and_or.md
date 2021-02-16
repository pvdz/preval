# Preval test case

# auto_ident_logic_and_or.md

> normalize > expressions > bindings > switch_w_default_case > auto_ident_logic_and_or
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = ($($(1)) && $($(1))) || $($(2));
    $(a);
  default:
    $("fail1");
  case 2:
    $("fail2");
}
`````

## Normalized

`````js filename=intro
let tmpCallCallee;
let tmpCalleeParam;
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
  tmpCallCallee = $;
  tmpCalleeParam = $(1);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    a = tmpCallCallee$1(tmpCalleeParam$1);
  }
  if (a) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    a = tmpCallCallee$2(tmpCalleeParam$2);
  }
  $(a);
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
`````

## Output

`````js filename=intro
let a;
let tmpSwitchCaseToStart = 1;
tmpSwitchCaseToStart = 0;
const tmpIfTest$2 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$2) {
  const tmpCalleeParam = $(1);
  a = $(tmpCalleeParam);
  if (a) {
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
  }
  if (a) {
  } else {
    const tmpCalleeParam$2 = $(2);
    a = $(tmpCalleeParam$2);
  }
  $(a);
}
const tmpIfTest$3 = tmpSwitchCaseToStart <= 1;
if (tmpIfTest$3) {
  $('fail1');
}
const tmpIfTest$4 = tmpSwitchCaseToStart <= 2;
if (tmpIfTest$4) {
  $('fail2');
}
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
 - 6: 'fail1'
 - 7: 'fail2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
