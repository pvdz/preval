# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$({ x: (a = b = 2) });
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
b = 2;
a = 2;
let tmpObjLitVal = a;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
const tmpCalleeParam = { x: 2 };
$(tmpCalleeParam);
$(2, 2, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '2' }
 - 2: 2, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
