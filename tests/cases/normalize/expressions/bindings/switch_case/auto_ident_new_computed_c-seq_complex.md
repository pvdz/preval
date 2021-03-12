# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto ident new computed c-seq complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = new (1, 2, $(b))[$("$")](1);
    $(a);
}
`````

## Normalized

`````js filename=intro
let b;
let a;
const tmpSwitchTest = 1;
let tmpSwitchCaseToStart = 1;
const tmpIfTest = 1 === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
if (tmpIfTest$1) {
  b = { $: $ };
  const tmpCompObj = $(b);
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  a = new tmpNewCallee(1);
  $(a);
}
`````

## Output

`````js filename=intro
const b = { $: $ };
const tmpCompObj = $(b);
const tmpCompProp = $('$');
const tmpNewCallee = tmpCompObj[tmpCompProp];
const a = new tmpNewCallee(1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
