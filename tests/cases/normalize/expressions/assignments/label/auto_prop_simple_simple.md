# Preval test case

# auto_prop_simple_simple.md

> normalize > expressions > assignments > label > auto_prop_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = { b: $(1) };
a.b = 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
}
a.b = 2;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
}
a.b = 2;
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same