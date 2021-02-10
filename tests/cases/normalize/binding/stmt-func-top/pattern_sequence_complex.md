# Preval test case

# pattern_sequence_complex.md

> normalize > assignment > stmt > pattern_sequence_complex
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

## Normalized

`````js filename=intro
function f() {
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
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: [10, 20, 30]
 - 4: 10, 20, 1, 2, [10, 20, 30]
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
