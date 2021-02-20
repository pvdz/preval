# Preval test case

# auto_ident_call_computed_c-seq_simple.md

> Normalize > Expressions > Bindings > Switch case > Auto ident call computed c-seq simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = (1, 2, $(b))["$"](1);
    $(a);
}
`````

## Normalized

`````js filename=intro
let b;
let tmpCallObj;
let a;
const tmpSwitchValue = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { $: $ };
  tmpCallObj = $(b);
  a = tmpCallObj.$(1);
  $(a);
}
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCallObj = $(b);
const a = tmpCallObj.$(1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
