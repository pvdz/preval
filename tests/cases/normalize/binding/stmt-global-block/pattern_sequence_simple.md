# Preval test case

# pattern_sequence_simple.md

> normalize > assignment > stmt > pattern_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = ($(x), $(y), z);
  $(a, b, x, y, z);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let x = 1;
  let y = 2;
  let z = [10, 20, 30];
  $(x);
  $(y);
  let bindingPatternArrRoot = z;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  let b = arrPatternSplat[1];
  $(a, b, x, y, z);
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let z = [10, 20, 30];
  $(1);
  $(2);
  let bindingPatternArrRoot = z;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  let b = arrPatternSplat[1];
  $(a, b, 1, 2, z);
}
`````

## Result

Should call `$` with:
 - 1: true
 - 2: 1
 - 3: 2
 - 4: 10, 20, 1, 2, [10, 20, 30]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
