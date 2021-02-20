# Preval test case

# auto_ident_ident.md

> Normalize > Expressions > Statement > Call spread > Auto ident ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(...b);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(...b);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(...1);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
