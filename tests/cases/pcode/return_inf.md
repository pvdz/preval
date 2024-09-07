# Preval test case

# return_inf.md

> Pcode > Return inf

## Options

- pcode

## Input

`````js filename=intro
function f(a) {
  return Infinity;
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
  return Infinity;
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
    [ return - Infinity ]
`````

Running function "f":

                                    pcode          =>   eval
 - `f()`                       => `null`           => `null`            Ok
 - `f(undefined)`              => `null`           => `null`            Ok
 - `f(null)`                   => `null`           => `null`            Ok
 - `f(true)`                   => `null`           => `null`            Ok
 - `f(false)`                  => `null`           => `null`            Ok
 - `f("")`                     => `null`           => `null`            Ok
 - `f("preval")`               => `null`           => `null`            Ok
 - `f(0)`                      => `null`           => `null`            Ok
 - `f(1)`                      => `null`           => `null`            Ok
 - `f(0, 0)`                   => `null`           => `null`            Ok
 - `f(0, 1)`                   => `null`           => `null`            Ok
 - `f(1, 0)`                   => `null`           => `null`            Ok
 - `f(1, 1)`                   => `null`           => `null`            Ok
 - `f(1)`                      => `null`           => `null`            Ok
 - `f(2)`                      => `null`           => `null`            Ok
 - `f("a")`                    => `null`           => `null`            Ok
 - `f(true)`                   => `null`           => `null`            Ok
