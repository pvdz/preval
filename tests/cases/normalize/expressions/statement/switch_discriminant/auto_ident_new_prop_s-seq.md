# Preval test case

# auto_ident_new_prop_s-seq.md

> normalize > expressions > statement > switch_discriminant > auto_ident_new_prop_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch (new (1, 2, b).$(1)) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
1;
2;
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
const tmpSwitchTest = new tmpNewCallee(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
new tmpNewCallee(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    $(100);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
