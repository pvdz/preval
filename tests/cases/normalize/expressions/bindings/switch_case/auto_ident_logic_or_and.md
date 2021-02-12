# Preval test case

# auto_ident_logic_or_and.md

> normalize > expressions > bindings > switch_case > auto_ident_logic_or_and
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = $($(0)) || ($($(1)) && $($(2)));
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
      tmpCalleeParam = $(0);
      a = tmpCallCallee(tmpCalleeParam);
      if (a) {
      } else {
        const tmpCallCallee$1 = $;
        const tmpCalleeParam$1 = $(1);
        a = tmpCallCallee$1(tmpCalleeParam$1);
        if (a) {
          const tmpCallCallee$2 = $;
          const tmpCalleeParam$2 = $(2);
          a = tmpCallCallee$2(tmpCalleeParam$2);
        }
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
      tmpCalleeParam = $(0);
      a = tmpCallCallee(tmpCalleeParam);
      if (a) {
      } else {
        const tmpCalleeParam$1 = $(1);
        a = $(tmpCalleeParam$1);
        if (a) {
          const tmpCalleeParam$2 = $(2);
          a = $(tmpCalleeParam$2);
        }
      }
      $(a);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
