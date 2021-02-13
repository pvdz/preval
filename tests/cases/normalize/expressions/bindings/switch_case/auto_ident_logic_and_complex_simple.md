# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_logic_and_complex_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(1)) && 2;
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpCallCallee;
  let tmpCalleeParam;
  let a;
  const tmpSwitchValue = 1;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === tmpSwitchValue;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      tmpCallCallee = $;
      tmpCalleeParam = $(1);
      a = tmpCallCallee(tmpCalleeParam);
      if (a) {
        a = 2;
      }
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let tmpCallCallee;
  let tmpCalleeParam;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      tmpCallCallee = $;
      tmpCalleeParam = $(1);
      a = tmpCallCallee(tmpCalleeParam);
      if (a) {
        a = 2;
      }
      $(a);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same