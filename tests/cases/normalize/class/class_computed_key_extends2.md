# Preval test case

# class_computed_key_extends2.md

> Normalize > Class > Class computed key extends2
>
> Make sure the transform of computed key does not change something that can change the super class value

#TODO

## Input

`````js filename=intro
const y = 'y';
class x {
  x(){ }
}

x().y;
`````

## Pre Normal


`````js filename=intro
const y = `y`;
let x = class {
  x() {
    debugger;
  }
};
x().y;
`````

## Normalized


`````js filename=intro
const y = `y`;
let x = class {
  x() {
    debugger;
    return undefined;
  }
};
const tmpCompObj = x();
tmpCompObj.y;
`````

## Output


`````js filename=intro
const x = class {
  x() {
    debugger;
    return undefined;
  }
};
const tmpCompObj = x();
tmpCompObj.y;
`````

## PST Output

With rename=true

`````js filename=intro
const a = class   {
x(  ) {
  debugger;
  return undefined;
}
};
const b = a();
b.y;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Class constructor x cannot be invoked without 'new' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
