# Preval test case

# pattern_sequence_complex.md

> Normalize > Binding > Stmt-func-top > Pattern sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = ($(x), $(y), $(z));
  $(a, b, x, y, z);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let x = 1,
    y = 2,
    z = [10, 20, 30];
  let [a, b] = ($(x), $(y), $(z));
  $(a, b, x, y, z);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let x = 1;
  let y = 2;
  let z = [10, 20, 30];
  $(x);
  $(y);
  let bindingPatternArrRoot = $(z);
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  let b = arrPatternSplat[1];
  $(a, b, x, y, z);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const z = [10, 20, 30];
$(1);
$(2);
const bindingPatternArrRoot = $(z);
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
const b = arrPatternSplat[1];
$(a, b, 1, 2, z);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [10, 20, 30]
 - 4: 10, 20, 1, 2, [10, 20, 30]
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
