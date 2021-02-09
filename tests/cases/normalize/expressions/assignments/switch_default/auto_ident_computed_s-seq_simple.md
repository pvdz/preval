# Preval test case

# auto_ident_computed_s-seq_simple.md

> normalize > expressions > assignments > switch_default > auto_ident_computed_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = (1, 2, b)[$("c")];
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    const tmpAssignRhsCompObj = b;
    const tmpAssignRhsCompProp = $('c');
    a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    const tmpAssignRhsCompObj = b;
    const tmpAssignRhsCompProp = $('c');
    a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'c'
 - 3: 1, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
