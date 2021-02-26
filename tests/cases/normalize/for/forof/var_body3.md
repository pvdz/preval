# Preval test case

# var_body3.md

> Normalize > For > Forof > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(const n of [1,2,3]) var x;
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
const tmpForOfDeclRhs = [1, 2, 3];
let n;
for (n of tmpForOfDeclRhs) {
  x = undefined;
}
$(x);
`````

## Output

`````js filename=intro
let x = undefined;
const tmpForOfDeclRhs = [1, 2, 3];
let n;
for (n of tmpForOfDeclRhs) {
  x = undefined;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
