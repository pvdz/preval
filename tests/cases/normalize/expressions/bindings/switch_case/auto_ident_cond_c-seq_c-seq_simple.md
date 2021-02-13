# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_cond_c-seq_c-seq_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = (10, 20, $(30)) ? (40, 50, $(60)) : $($(100));
    $(a);
}
`````

## Normalized

`````js filename=intro
{
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
      a = undefined;
      const tmpIfTest$2 = $(30);
      if (tmpIfTest$2) {
        a = $(60);
      } else {
        const tmpCallCallee = $;
        const tmpCalleeParam = $(100);
        a = tmpCallCallee(tmpCalleeParam);
      }
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      a = undefined;
      const tmpIfTest$2 = $(30);
      if (tmpIfTest$2) {
        a = $(60);
      } else {
        const tmpCalleeParam = $(100);
        a = $(tmpCalleeParam);
      }
      $(a);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 30
 - 2: 60
 - 3: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same