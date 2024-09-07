# Preval test case

# return_neg_arg.md

> Pcode > Return neg arg

## Options

- pcode

## Input

`````js filename=intro
function f(a) {
  return -a;
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
  return -a;
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
    [ r1 neg r0 - ]
    [ return r1 - ]
`````

Running function "f":

                                    pcode          =>   eval
 - `f()`                       => `null`           => `null`            Ok
 - `f(undefined)`              => `null`           => `null`            Ok
 - `f(null)`                   => `0`              => `0`               Ok
 - `f(true)`                   => `-1`             => `-1`              Ok
 - `f(false)`                  => `0`              => `0`               Ok
 - `f("")`                     => `0`              => `0`               Ok
 - `f("preval")`               => `null`           => `null`            Ok
 - `f(0)`                      => `0`              => `0`               Ok
 - `f(1)`                      => `-1`             => `-1`              Ok
 - `f(0, 0)`                   => `0`              => `0`               Ok
 - `f(0, 1)`                   => `0`              => `0`               Ok
 - `f(1, 0)`                   => `-1`             => `-1`              Ok
 - `f(1, 1)`                   => `-1`             => `-1`              Ok
 - `f(1)`                      => `-1`             => `-1`              Ok
 - `f(2)`                      => `-2`             => `-2`              Ok
 - `f("a")`                    => `null`           => `null`            Ok
 - `f(true)`                   => `-1`             => `-1`              Ok
