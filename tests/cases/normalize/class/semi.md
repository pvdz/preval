# Preval test case

# semi.md

> normalize > class > semi
>
> Classes can have semi's. They shouldn't matter.

#TODO

## Input

`````js filename=intro
class x {
  a() {}
  ;;;
  b() {}
}
$(new x().b());
`````

## Normalized

`````js filename=intro
let x = class {
  a() {}
  b() {}
};
const tmpCallCallee = $;
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.b();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let x = class {
  a() {}
  b() {}
};
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.b();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
