# Preval test case

# auto_ident_object_simple.md

> normalize > expressions > assignments > label > auto_ident_object_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = { x: 1, y: 2, z: 3 };
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
label: {
  a = { x: 1, y: 2, z: 3 };
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
