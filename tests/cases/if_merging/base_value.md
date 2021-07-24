# Preval test case

# base_value.md

> If merging > Base value
>
> When back to back ifs test on the same constant, the ifs can be merged safely

#TODO

## Input

`````js filename=intro
const y = !$spy(10);
if (y) $('a'); else $('b');
if (y) $('d'); else $('c');
`````

## Pre Normal

`````js filename=intro
const y = !$spy(10);
if (y) $(`a`);
else $(`b`);
if (y) $(`d`);
else $(`c`);
`````

## Normalized

`````js filename=intro
const tmpUnaryArg = $spy(10);
const y = !tmpUnaryArg;
if (y) {
  $(`a`);
} else {
  $(`b`);
}
if (y) {
  $(`d`);
} else {
  $(`c`);
}
`````

## Output

`````js filename=intro
const tmpUnaryArg = $spy(10);
if (tmpUnaryArg) {
  $(`b`);
  $(`c`);
} else {
  $(`a`);
  $(`d`);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'Creating spy', 1, 1, [10, 10]
 - 2: 'b'
 - 3: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
