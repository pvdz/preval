# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Switch case test > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
switch ($(1)) {
  case $({ a: 1, b: 2 }):
}
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpSwitchTest = $(1);
const tmpSwitchValue = tmpSwitchTest;
let tmpSwitchCaseToStart = 1;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpBinLhs = tmpCallCallee(tmpCalleeParam);
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
$(a);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { a: 999, b: 1000 };
const a = bindingPatternObjRoot.a;
const tmpSwitchTest = $(1);
let tmpSwitchCaseToStart = 1;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpBinLhs = $(tmpCalleeParam);
const tmpIfTest = tmpBinLhs === tmpSwitchTest;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
}
tmpSwitchCaseToStart <= 0;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
