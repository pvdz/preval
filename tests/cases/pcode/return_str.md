# Preval test case

# return_str.md

> Pcode > Return str

## Options

- pcode

## Input

`````js filename=intro
function f(a) {
  return 'haha';
}

$(f(1));
$(f(2));
$(f('a'));
$(f(true));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  return `haha`;
};
$(f(1));
$(f(2));
$(f(`a`));
$(f(true));
`````

## Pcode output

`````fileintro
f =
    [ r0 = $$0 - ]
    [ return - "haha" ]
`````

Running function "f":

                                    pcode          =>   eval
 - `f()`                       => `"haha"`         => `"haha"`          Ok
 - `f(undefined)`              => `"haha"`         => `"haha"`          Ok
 - `f(null)`                   => `"haha"`         => `"haha"`          Ok
 - `f(true)`                   => `"haha"`         => `"haha"`          Ok
 - `f(false)`                  => `"haha"`         => `"haha"`          Ok
 - `f("")`                     => `"haha"`         => `"haha"`          Ok
 - `f("preval")`               => `"haha"`         => `"haha"`          Ok
 - `f(0)`                      => `"haha"`         => `"haha"`          Ok
 - `f(1)`                      => `"haha"`         => `"haha"`          Ok
 - `f(0, 0)`                   => `"haha"`         => `"haha"`          Ok
 - `f(0, 1)`                   => `"haha"`         => `"haha"`          Ok
 - `f(1, 0)`                   => `"haha"`         => `"haha"`          Ok
 - `f(1, 1)`                   => `"haha"`         => `"haha"`          Ok
 - `f(1)`                      => `"haha"`         => `"haha"`          Ok
 - `f(2)`                      => `"haha"`         => `"haha"`          Ok
 - `f("a")`                    => `"haha"`         => `"haha"`          Ok
 - `f(true)`                   => `"haha"`         => `"haha"`          Ok
