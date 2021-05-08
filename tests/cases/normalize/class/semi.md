# Preval test case

# semi.md

> Normalize > Class > Semi
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

## Pre Normal

`````js filename=intro
let x = class {
  a() {
    debugger;
  }
  b() {
    debugger;
  }
};
$(new x().b());
`````

## Normalized

`````js filename=intro
let x = class {
  a() {
    debugger;
    return undefined;
  }
  b() {
    debugger;
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.b();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const x = class {
  a() {
    debugger;
    return undefined;
  }
  b() {
    debugger;
    return undefined;
  }
};
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.b();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
