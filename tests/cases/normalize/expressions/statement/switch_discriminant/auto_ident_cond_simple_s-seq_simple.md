# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident cond simple s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch (1 ? (40, 50, 60) : $($(100))) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = 1 ? (40, 50, 60) : $($(100));
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchDisc = undefined;
tmpSwitchDisc = 60;
$(100);
$(a);
`````

## Output

`````js filename=intro
$(100);
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
