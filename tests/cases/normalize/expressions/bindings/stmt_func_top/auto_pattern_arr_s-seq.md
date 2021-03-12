# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Bindings > Stmt func top > Auto pattern arr s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let [a] = ($(10), $(20), [1, 2]);
  $(a);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let [a] = ($(10), $(20), [1, 2]);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  $(10);
  $(20);
  let bindingPatternArrRoot = [1, 2];
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  $(a);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(10);
  $(20);
  const bindingPatternArrRoot = [1, 2];
  const arrPatternSplat = [...bindingPatternArrRoot];
  const a = arrPatternSplat[0];
  $(a);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
