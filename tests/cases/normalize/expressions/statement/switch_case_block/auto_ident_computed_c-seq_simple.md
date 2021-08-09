# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Statement > Switch case block > Auto ident computed c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1): {
    (1, 2, $(b))[$("c")];
  }
}
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (tmpSwitchDisc === $(1)) {
    {
      (1, 2, $(b))[$(`c`)];
    }
  } else {
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothLhs = tmpSwitchDisc;
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  tmpCompObj[tmpCompProp];
} else {
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpBinBothRhs = $(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  tmpCompObj[tmpCompProp];
} else {
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { c: '1' }
 - 4: 'c'
 - 5: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
