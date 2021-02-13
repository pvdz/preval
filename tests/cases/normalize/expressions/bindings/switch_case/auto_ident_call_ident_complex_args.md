# Preval test case

# auto_ident_call_ident_complex_args.md

> normalize > expressions > bindings > switch_case > auto_ident_call_ident_complex_args
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = $($(1), $(2));
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
  let tmpCallCallee;
  let tmpCalleeParam;
  let tmpCalleeParam$1;
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
      b = { $: $ };
      tmpCallCallee = $;
      tmpCalleeParam = $(1);
      tmpCalleeParam$1 = $(2);
      a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
      $(a);
    }
  }
}
`````

## Output

`````js filename=intro
{
  let b;
  let tmpCallCallee;
  let tmpCalleeParam;
  let tmpCalleeParam$1;
  let a;
  let tmpSwitchCaseToStart = 1;
  const tmpIfTest = 1 === 1;
  if (tmpIfTest) {
    tmpSwitchCaseToStart = 0;
  }
  {
    const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
    if (tmpIfTest$1) {
      b = { $: $ };
      tmpCallCallee = $;
      tmpCalleeParam = $(1);
      tmpCalleeParam$1 = $(2);
      a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
      $(a);
    }
  }
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same