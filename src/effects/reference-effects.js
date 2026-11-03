// Locally preserved rendering primitives from the requested Cypher Capital reference.
// Isolated from the reference application: no remote scripts, telemetry or original runtime.
const factories = {};
const modules = {
  695150: {
    isOverlayLifted: () =>
      !document.documentElement.hasAttribute("data-intro-playing"),
    onOverlayLifted: (callback) => {
      window.addEventListener("uxhub:intro-finished", callback);
      return () =>
        window.removeEventListener("uxhub:intro-finished", callback);
    },
  },
};
function read(id) {
  if (modules[id]) return modules[id];
  modules[id] = {};
  const factory = factories[id];
  if (!factory) throw new Error("Unknown effect module " + id);
  factory({
    i: read,
    s(values, target = id) {
      const result = modules[target] || (modules[target] = {});
      for (let i = 0; i < values.length; i += 3)
        result[values[i]] = values[i + 2];
    },
  });
  return modules[id];
}
factories[79656] = (e) => {
  "use strict";
  function t(e, t, r) {
    let n = e.createShader(t);
    if (!n) throw Error("shader allocation failed");
    return (e.shaderSource(n, r), e.compileShader(n), n);
  }
  e.s([
    "disposePendingProgram",
    0,
    function (e, t) {
      (e.deleteShader(t.vertex),
        e.deleteShader(t.fragment),
        e.deleteProgram(t.program));
    },
    "finishProgram",
    0,
    function (e, t) {
      let { program: r, vertex: n, fragment: o } = t,
        i = !0 === e.getProgramParameter(r, e.LINK_STATUS),
        l = i
          ? ""
          : [
              e.getShaderInfoLog(n),
              e.getShaderInfoLog(o),
              e.getProgramInfoLog(r),
            ]
              .filter(Boolean)
              .join(" | ");
      if ((e.deleteShader(n), e.deleteShader(o), i)) return r;
      throw (
        e.deleteProgram(r),
        Error(`program link failed: ${l || "unknown"}`)
      );
    },
    "isProgramComplete",
    0,
    function (e, t) {
      return (
        !t.parallel ||
        !0 ===
          e.getProgramParameter(t.program, t.parallel.COMPLETION_STATUS_KHR)
      );
    },
    "linkProgramAsync",
    0,
    function (e, r, n, o) {
      let i = e.getExtension("KHR_parallel_shader_compile"),
        l = t(e, e.VERTEX_SHADER, r),
        a = t(e, e.FRAGMENT_SHADER, n),
        u = e.createProgram();
      if (!u)
        throw (
          e.deleteShader(l),
          e.deleteShader(a),
          Error("program allocation failed")
        );
      return (
        e.attachShader(u, l),
        e.attachShader(u, a),
        o?.(u),
        e.linkProgram(u),
        { program: u, vertex: l, fragment: a, parallel: i }
      );
    },
  ]);
};
factories[433499] = factories[83723] = (e) => {
  "use strict";
  let t = { x: -90, y: -90, width: 1620, height: 1192.5 },
    r = [
      {
        start: [-222.724, 504.473],
        curves: [
          [-222.724, 504.473, 304.862, 504.473, 749.059, 504.473],
          [1193.25, 504.473, 1176.74, 692.755, 1668, 692.755],
        ],
        gray: 32 / 255,
      },
      {
        start: [-222.724, 504.473],
        curves: [
          [-222.724, 504.473, 60.4716, 504.473, 504.668, 504.473],
          [948.864, 504.473, 1176.74, -52.4742, 1668, -52.4742],
        ],
        gray: 132 / 255,
      },
      {
        start: [-222.724, 504.473],
        curves: [
          [-222.724, 504.473, 304.862, 504.473, 749.059, 504.473],
          [1193.25, 504.473, 1176.74, 259.574, 1668, 259.574],
        ],
        gray: 56 / 255,
      },
      {
        start: [-223.057, 504.476],
        curves: [
          [-223.057, 504.476, -299.029, 504.476, 145.246, 504.476],
          [912.887, 504.476, 657.455, 924.491, 1668, 924.491],
        ],
        gray: 0,
      },
    ],
    o = Math.max(...r.map((e) => e.gray));
  function a(e, t) {
    return t + (e / o) * (o - t);
  }
  function i(e) {
    let t = [e.start[0], e.start[1]],
      [r, o] = e.start;
    for (let [a, i, l, n, s, u] of e.curves) {
      for (let e = 1; e <= 48; e++) {
        let f = e / 48,
          c = 1 - f,
          h = c * c * c,
          d = 3 * c * c * f,
          m = 3 * c * f * f,
          p = f * f * f;
        t.push(h * r + d * a + m * l + p * s, h * o + d * i + m * n + p * u);
      }
      ((r = s), (o = u));
    }
    let a = Float64Array.from(t),
      i = a.length / 2,
      l = new Float64Array(i);
    for (let e = 1; e < i; e++) {
      let t = a[2 * e] - a[2 * e - 2],
        r = a[2 * e + 1] - a[2 * e - 1];
      l[e] = l[e - 1] + Math.hypot(t, r);
    }
    return { points: a, cumulative: l, total: l[i - 1] };
  }
  function l(e) {
    let t = new Path2D();
    for (let [r, o, a, i, l, n] of (t.moveTo(e.start[0], e.start[1]), e.curves))
      t.bezierCurveTo(r, o, a, i, l, n);
    return t;
  }
  e.s(
    [
      "BRANCHES",
      0,
      r,
      "CROP_ASPECT",
      0,
      1,
      "OVERFLOW_SCALE",
      0,
      1.25,
      "REGION",
      0,
      t,
      "STROKE_WIDTH",
      0,
      151.074,
      "VIEWBOX_HEIGHT",
      0,
      810,
      "VIEWBOX_WIDTH",
      0,
      1440,
      "branchTone",
      0,
      a,
      "buildBranchPath",
      0,
      l,
      "flattenBranch",
      0,
      i,
    ],
    83723,
  );
  let n = (e) => Math.round((e * t.height) / t.width);
  e.s(
    [
      "buildLiquidMask",
      0,
      function ({ width: e, shadeFloor: o }, l) {
        let s = n(e),
          u = Math.round(e / 2),
          f = n(u),
          c = new Uint8Array(e * s * 4),
          h = new Uint8Array(e * s * 4);
        for (let e = 0; e < c.length; e += 4)
          ((c[e + 3] = 255), (h[e + 3] = 255));
        let d = new Float32Array(u * f).fill(1);
        for (let n = 0; n < r.length; n++) {
          let m = r[n],
            p = i(m),
            v = l(m, e, s),
            g = (function (e, r, o, a, i) {
              let l = a / t.width,
                n = -t.x * l,
                s = -t.y * l,
                u = 75.537 * l + 8,
                f = new Float32Array(a * i).fill(1 / 0),
                c = new Uint16Array(a * i);
              for (let t = 1; t < r.length; t++) {
                let h = e[2 * t - 2] * l + n,
                  d = e[2 * t - 1] * l + s,
                  m = e[2 * t] * l + n,
                  p = e[2 * t + 1] * l + s,
                  v = m - h,
                  g = p - d,
                  _ = v * v + g * g,
                  x = r[t - 1] / o,
                  w = r[t] / o,
                  b = Math.max(0, Math.floor(Math.min(h, m) - u)),
                  y = Math.min(a - 1, Math.ceil(Math.max(h, m) + u)),
                  E = Math.max(0, Math.floor(Math.min(d, p) - u)),
                  T = Math.min(i - 1, Math.ceil(Math.max(d, p) + u));
                for (let e = E; e <= T; e++) {
                  let t = e * a;
                  for (let r = b; r <= y; r++) {
                    let o =
                        _ > 0
                          ? Math.min(
                              Math.max(((r - h) * v + (e - d) * g) / _, 0),
                              1,
                            )
                          : 0,
                      a = r - (h + o * v),
                      i = e - (d + o * g),
                      l = a * a + i * i,
                      n = t + r;
                    l < f[n] &&
                      ((f[n] = l),
                      (c[n] = Math.round((x + (w - x) * o) * 65535)));
                  }
                }
              }
              return c;
            })(p.points, p.cumulative, p.total, e, s),
            _ = (function (e, t, r) {
              let o = new Float32Array(e.length);
              for (let a = 0; a < r; a++) {
                let r = a * t,
                  i = 0;
                for (let o = -2; o <= 2; o++)
                  i += e[r + Math.min(Math.max(o, 0), t - 1)];
                for (let a = 0; a < t; a++)
                  ((o[r + a] = i / 5),
                    (i +=
                      e[r + Math.min(a + 2 + 1, t - 1)] -
                      e[r + Math.max(a - 2, 0)]));
              }
              let a = new Uint8Array(e.length);
              for (let e = 0; e < t; e++) {
                let i = 0;
                for (let a = -2; a <= 2; a++)
                  i += o[Math.min(Math.max(a, 0), r - 1) * t + e];
                for (let l = 0; l < r; l++)
                  ((a[l * t + e] = Math.round(i / 5)),
                    (i +=
                      o[Math.min(l + 2 + 1, r - 1) * t + e] -
                      o[Math.max(l - 2, 0) * t + e]));
              }
              return a;
            })(v, e, s),
            x = l(m, u, f),
            w = new Uint8Array(x.length);
          for (let e = 0; e < w.length; e++) w[e] = +(x[e] > 127);
          let b = (function (e, t) {
            let r = 0;
            for (let t = 0; t < e.length; t++) e[t] > r && (r = e[t]);
            let o = new Float32Array(e.length).fill(1);
            if (r <= 0) return o;
            for (let a = 0; a < e.length; a++) t[a] && (o[a] = 1 - e[a] / r);
            return o;
          })(
            (function (e, t, r) {
              let o = [],
                a = [];
              for (let i = 1; i < r - 1; i++)
                for (let r = 1; r < t - 1; r++) {
                  let l = i * t + r;
                  e[l] &&
                    e[l - 1] &&
                    e[l + 1] &&
                    e[l - t] &&
                    e[l + t] &&
                    e[l - t - 1] &&
                    e[l - t + 1] &&
                    e[l + t - 1] &&
                    e[l + t + 1] &&
                    (((r + i) & 1) == 0 ? o.push(l) : a.push(l));
                }
              let i = Uint32Array.from(o),
                l = Uint32Array.from(a),
                n = new Float32Array(t * r);
              for (let e = 0; e < 40; e++)
                for (let e of [i, l])
                  for (let r = 0; r < e.length; r++) {
                    let o = e[r],
                      a =
                        (0.01 + n[o - 1] + n[o + 1] + n[o - t] + n[o + t]) *
                        0.25;
                    n[o] = 1.9 * a + -0.8999999999999999 * n[o];
                  }
              return n;
            })(w, u, f),
            w,
          );
          for (let e = 0; e < d.length; e++) {
            let t = x[e] / 255;
            t > 0 && (d[e] = b[e] * t + d[e] * (1 - t));
          }
          let y = Math.round((n + 0.5) * (255 / r.length)),
            E = Math.round(255 * a(m.gray, o));
          for (let e = 0; e < v.length; e++) {
            let t = v[e],
              r = _[e];
            if (!t && !r) continue;
            let o = 4 * e,
              a = r / 255;
            ((c[o] = Math.round(r + c[o] * (1 - a))),
              (c[o + 1] = Math.round(t + c[o + 1] * (1 - t / 255))),
              (c[o + 2] = Math.round(E * a + c[o + 2] * (1 - a))),
              t &&
                ((h[o] = y), (h[o + 1] = g[e] >> 8), (h[o + 2] = 255 & g[e])));
          }
        }
        return {
          base: c,
          meta: h,
          width: e,
          height: s,
          field: d,
          fieldWidth: u,
          fieldHeight: f,
        };
      },
      "createRasterizer",
      0,
      function (e) {
        let r = new Map();
        return (o, a, i) => {
          let n = r.get(a);
          n || ((n = e(a, i)), r.set(a, n));
          let s = a / t.width;
          (n.setTransform(1, 0, 0, 1, 0, 0),
            n.clearRect(0, 0, a, i),
            n.setTransform(s, 0, 0, s, -t.x * s, -t.y * s),
            (n.lineWidth = 151.074),
            (n.lineCap = "butt"),
            (n.strokeStyle = "#fff"),
            n.stroke(l(o)));
          let u = n.getImageData(0, 0, a, i).data,
            f = new Uint8Array(a * i);
          for (let e = 0; e < f.length; e++) f[e] = u[4 * e + 3];
          return f;
        };
      },
    ],
    433499,
  );
};
factories[852201] = (e) => {
  "use strict";
  var t = e.i(79656),
    r = e.i(695150),
    o = e.i(83723);
  let a = `#version 300 es
precision highp float;

out vec2 v_uv;

void main() {
  vec2 pos = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  v_uv = pos;
  gl_Position = vec4(pos * 2. - 1., 0., 1.);
}
`,
    i = `#version 300 es
precision highp float;

uniform sampler2D u_image;
uniform sampler2D u_meta;
uniform sampler2D u_edge;
uniform vec2 u_resolution;
uniform float u_time;

uniform float u_softness;
uniform float u_repetition;
uniform float u_shiftRed;
uniform float u_shiftBlue;
uniform float u_shadowBlue;
uniform float u_distortion;
uniform float u_contour;
uniform float u_angle;
uniform float u_flow;

uniform vec2 u_uvScale;
uniform vec2 u_uvOffset;

uniform float u_branchReveal[4];
uniform float u_feather;

in vec2 v_uv;
out vec4 fragColor;

#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float getColorChanges(float c1, float c2, float stripe_p, vec3 w, float blur, float bump) {
  float ch = mix(c2, c1, smoothstep(.0, 2. * blur, stripe_p));

  float border = w[0];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  bump = smoothstep(.2, .8, bump);
  border = w[0] + .4 * (1. - bump) * w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + .5 * (1. - bump) * w[1];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
  float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
  ch = mix(ch, gradient, smoothstep(border, border + .5 * blur, stripe_p));

  return ch;
}

// Bicubic B-spline reconstruction of the float edge field via 4 bilinear
// taps. Plain bilinear is only piecewise-smooth: the crease shading amplifies
// its texel-cell boundaries into visible squares.
float sampleEdgeField(vec2 uv) {
  vec2 ts = vec2(textureSize(u_edge, 0));
  vec2 coord = uv * ts - 0.5;
  vec2 f = fract(coord);
  vec2 b = coord - f;
  vec2 f2 = f * f;
  vec2 f3 = f2 * f;
  vec2 w0 = (1. - 3. * f + 3. * f2 - f3) / 6.;
  vec2 w1 = (4. - 6. * f2 + 3. * f3) / 6.;
  vec2 w2 = (1. + 3. * f + 3. * f2 - 3. * f3) / 6.;
  vec2 w3 = f3 / 6.;
  vec2 g0 = w0 + w1;
  vec2 g1 = w2 + w3;
  vec2 p0 = (b - 1. + w1 / g0 + 0.5) / ts;
  vec2 p1 = (b + 1. + w3 / g1 + 0.5) / ts;
  float s00 = texture(u_edge, vec2(p0.x, p0.y)).r;
  float s10 = texture(u_edge, vec2(p1.x, p0.y)).r;
  float s01 = texture(u_edge, vec2(p0.x, p1.y)).r;
  float s11 = texture(u_edge, vec2(p1.x, p1.y)).r;
  return g0.y * (g0.x * s00 + g1.x * s10) + g1.y * (g0.x * s01 + g1.x * s11);
}

void main() {
  const float firstFrameOffset = 2.8;
  float t = .3 * (u_time + firstFrameOffset);

  // Screen maps to the visible sub-rect of the padded mask texture
  vec2 uv = u_uvOffset + vec2(v_uv.x, 1.0 - v_uv.y) * u_uvScale;
  vec2 dudx = dFdx(uv);
  vec2 dudy = dFdy(uv);
  vec4 img = textureGrad(u_image, uv, dudx, dudy);
  vec4 meta = textureGrad(u_meta, uv, dudx, dudy);

  int branch = clamp(int(meta.r * 4.0), 0, 3);

  // Interleaved gradient noise, shared by the reveal front and the color
  // banding fix (sin-based hashes pattern up on Apple GPUs)
  float dither = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - .5;

  // Trim-path reveal with a feathered front. The edge field (0 at the pipe
  // centerline, 1 at its sides) bows the fade forward in the middle, so the
  // soft tip rounds outward like a cap instead of a flat cut caving in.
  // Arc length is 16-bit across the G/B pair (NEAREST keeps them consistent)
  float pathParam = (meta.g * 65280. + meta.b * 255.) / 65535.;
  float edgeRaw = clamp(sampleEdgeField(uv), 0., 1.);
  float reveal = u_branchReveal[branch];
  float front = pathParam + u_feather * edgeRaw;
  float visible = 1.0 - smoothstep(reveal - u_feather, reveal, front);

  float cycleWidth = u_repetition;

  vec2 rotatedUV = uv - vec2(.5);
  float angle = (-u_angle + 70.) * PI / 180.;
  float cosA = cos(angle);
  float sinA = sin(angle);
  rotatedUV = vec2(
    rotatedUV.x * cosA - rotatedUV.y * sinA,
    rotatedUV.x * sinA + rotatedUV.y * cosA
  ) + vec2(.5);

  float edge = pow(edgeRaw, 1.6);
  edge *= smoothstep(0.0, 0.4, u_contour);

  // Coverage is re-thresholded against its own screen-space derivative:
  // magnified bilinear ramps become a crisp, consistently anti-aliased edge
  float aaw = max(fwidth(img.g), 1e-4);
  float opacity = clamp((img.g - .5) / aaw + .5, 0., 1.) * visible;

  // Un-premultiplied branch gray: B and R are a matched feathered pair, so
  // the ratio is smooth across branch seams and stable at the silhouette
  float shade = clamp(img.b / max(img.r, 0.004), 0., 1.);

  float diagBLtoTR = rotatedUV.x - rotatedUV.y;

  float c1 = min(1., .72 + .5 * shade);
  float c2 = .05 + .85 * shade;
  vec3 color1 = vec3(.98 * c1, .98 * c1, c1);
  vec3 color2 = vec3(c2, c2, c2 + u_shadowBlue);

  vec2 grad_uv = uv - .5;

  float dist = length(grad_uv + vec2(0., .2 * diagBLtoTR));
  // The spatially varying rotation makes the scroll swirl around the center;
  // u_flow fades it out so the phase gradient straightens to +x and the
  // pattern translates left to right (time is subtracted from the phase)
  grad_uv = rotate(grad_uv, (1. - u_flow) * (.25 - .2 * diagBLtoTR) * PI);
  float direction = grad_uv.x;

  float bump = pow(1.8 * dist, 1.2);
  bump = 1. - bump;
  bump *= pow(uv.y, .3);

  float thin_strip_1_ratio = .12 / cycleWidth * (1. - .4 * bump);
  float thin_strip_2_ratio = .07 / cycleWidth * (1. + .4 * bump);
  float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);

  float thin_strip_1_width = cycleWidth * thin_strip_1_ratio;
  float thin_strip_2_width = cycleWidth * thin_strip_2_ratio;

  // Noise drifts with the flow: diagonal for the original look, horizontal
  // when flowing left to right
  float noise = snoise(uv - mix(vec2(t), vec2(t, 0.), u_flow));

  edge += (1. - edge) * u_distortion * noise;

  // In flow mode the diagonal tilt is toned down — at full strength its
  // constant gradient dominates the x-ramp and drags the motion off-axis
  direction += mix(1., .3, u_flow) * diagBLtoTR;
  direction -= 2. * noise * diagBLtoTR * (smoothstep(0., 1., edge) * (1.0 - smoothstep(0., 1., edge)));
  direction *= mix(1., 1. - edge, smoothstep(.5, 1., u_contour));
  direction -= 1.7 * edge * smoothstep(.5, 1., u_contour);
  direction += .2 * pow(u_contour, 4.) * (1.0 - smoothstep(0., 1., edge));

  bump *= clamp(pow(uv.y, .1), .3, 1.);
  // Multiplying the traveling x-ramp by the radial bump bends the phase
  // gradient toward the center (motion reads as radiating from the middle);
  // in flow mode a flat factor keeps the stripe richness without the pull
  direction *= (.1 + (1.1 - edge) * mix(bump, .6, u_flow));

  direction *= (.4 + .6 * (1.0 - smoothstep(.5, 1., edge)));
  direction += .18 * (smoothstep(.1, .2, uv.y) * (1.0 - smoothstep(.2, .4, uv.y)));
  direction += .03 * (smoothstep(.1, .2, 1. - uv.y) * (1.0 - smoothstep(.2, .4, 1. - uv.y)));

  // Same reasoning: the y-dependent scale is center-symmetric on the x-ramp
  direction *= mix(.5 + .5 * pow(uv.y, 2.), 1., u_flow);
  direction *= cycleWidth;
  direction -= t;
  // No per-branch phase offset: any phase coupling to shade sweeps through
  // whole stripe cycles inside the 2px seam blend, rendering a torn glitter
  // line where pipes cross

  float colorDispersion = clamp(1. - bump, 0., 1.);
  float dispersionRed = colorDispersion;
  dispersionRed += .03 * bump * noise;
  dispersionRed += 5. * (smoothstep(-.1, .2, uv.y) * (1.0 - smoothstep(.1, .5, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, 1., bump)));
  dispersionRed -= diagBLtoTR;

  float dispersionBlue = colorDispersion * 1.3;
  dispersionBlue += (smoothstep(0., .4, uv.y) * (1.0 - smoothstep(.1, .8, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, .8, bump)));
  dispersionBlue -= .2 * edge;

  dispersionRed *= (u_shiftRed / 20.);
  dispersionBlue *= (u_shiftBlue / 20.);

  float softness = 0.05 * u_softness;
  float blur = softness + .5 * smoothstep(1., 10., u_repetition) * smoothstep(.0, 1., edge);
  float smallCanvasT = 1.0 - smoothstep(100., 500., min(u_resolution.x, u_resolution.y));
  blur += smallCanvasT * smoothstep(.0, 1., edge);
  float rExtraBlur = softness * (0.05 + .1 * (u_shiftRed / 20.) * bump);
  float gExtraBlur = softness * 0.05 / max(0.001, abs(1. - diagBLtoTR));

  vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
  w[1] -= .02 * smoothstep(.0, 1., edge + bump);
  // AA widths are taken from the continuous phase, not its fract: fract's
  // wrap jumps make fwidth spike on alternating quads, which shows up as a
  // checkerboard on Apple GPUs
  // Two-regime stripe AA: moderate derivatives are clamped (their per-quad
  // estimation noise reads as a checkerboard on Apple GPUs), but large ones
  // pass through — the crease flanks sweep whole stripe cycles across a few
  // pixels and alias into ragged sparkle without real derivative AA
  float fwCap = .2 * blur;
  float fw_r = fwidth(direction + dispersionRed);
  float fw_g = fwidth(direction);
  float fw_b = fwidth(direction - dispersionBlue);
  fw_r = mix(min(fw_r, fwCap), fw_r, smoothstep(4. * fwCap, 12. * fwCap, fw_r));
  fw_g = mix(min(fw_g, fwCap), fw_g, smoothstep(4. * fwCap, 12. * fwCap, fw_g));
  fw_b = mix(min(fw_b, fwCap), fw_b, smoothstep(4. * fwCap, 12. * fwCap, fw_b));
  float stripe_r = fract(direction + dispersionRed);
  float r = getColorChanges(color1.r, color2.r, stripe_r, w, blur + fw_r + rExtraBlur, bump);
  float stripe_g = fract(direction);
  float g = getColorChanges(color1.g, color2.g, stripe_g, w, blur + fw_g + gExtraBlur, bump);
  float stripe_b = fract(direction - dispersionBlue);
  float b = getColorChanges(color1.b, color2.b, stripe_b, w, blur + fw_b, bump);

  vec3 color = vec3(r, g, b) * opacity;

  // Dither against banding: interleaved gradient noise — sin-based hashes
  // produce structured patterns on Apple GPUs. Scaled by opacity to keep the
  // premultiplied color valid, or it composites as a dot grid onto the page
  color = clamp(color + (1. / 255.) * dither * opacity, 0., opacity);

  fragColor = vec4(color, opacity);
}
`,
    l = { startDelay: 0, stagger: 0.13, duration: 2.5, feather: 0.2 },
    n = {
      repetition: 1.79,
      softness: 1,
      shiftRed: 0.61,
      shiftBlue: 0.33,
      shadowBlue: 0.075,
      distortion: 0.07,
      contour: 0.97,
      angle: 0,
      flow: 1,
      speed: 0.48,
    },
    s = (e) => (e < 0.5 ? 4 * e * e * e : 1 - Math.pow(-2 * e + 2, 3) / 2);
  e.s(
    [
      "HERO_LIQUID_EFFECT",
      0,
      n,
      "HERO_LIQUID_INTRO",
      0,
      l,
      "createLiquidRenderer",
      0,
      function (
        e,
        u,
        {
          intro: f,
          onActive: c,
          onError: h,
          params: d = n,
          introTiming: m = l,
          capture: p = !1,
        },
      ) {
        let v = e.getContext("webgl2", {
          alpha: !0,
          antialias: !1,
          depth: !1,
          stencil: !1,
          premultipliedAlpha: !0,
          preserveDrawingBuffer: p,
          powerPreference: "high-performance",
        });
        if (!v) throw Error("webgl2 unavailable");
        let g = (0, t.linkProgramAsync)(v, a, i),
          _ = null;
        (v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
          v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL, !1));
        let x = v.createTexture(),
          w = v.createTexture(),
          b = v.createTexture(),
          y = (e, t, r, o, a) => {
            (v.activeTexture(v.TEXTURE0 + e),
              v.bindTexture(v.TEXTURE_2D, t),
              v.texImage2D(
                v.TEXTURE_2D,
                0,
                v.RGBA,
                r.width,
                r.height,
                0,
                v.RGBA,
                v.UNSIGNED_BYTE,
                o,
              ),
              v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MIN_FILTER, a),
              v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MAG_FILTER, a),
              v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_S, v.CLAMP_TO_EDGE),
              v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_T, v.CLAMP_TO_EDGE));
          },
          E = (e) => {
            (y(0, x, e, e.base, v.LINEAR),
              y(1, w, e, e.meta, v.NEAREST),
              v.activeTexture(v.TEXTURE2),
              v.bindTexture(v.TEXTURE_2D, b),
              v.texImage2D(
                v.TEXTURE_2D,
                0,
                v.R16F,
                e.fieldWidth,
                e.fieldHeight,
                0,
                v.RED,
                v.FLOAT,
                e.field,
              ),
              v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MIN_FILTER, v.LINEAR),
              v.texParameteri(v.TEXTURE_2D, v.TEXTURE_MAG_FILTER, v.LINEAR),
              v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_S, v.CLAMP_TO_EDGE),
              v.texParameteri(v.TEXTURE_2D, v.TEXTURE_WRAP_T, v.CLAMP_TO_EDGE));
          };
        E(u);
        let T = null,
          M = null,
          R = null,
          A = null,
          I = null,
          P = o.VIEWBOX_WIDTH / o.REGION.width,
          L = (o.VIEWBOX_HEIGHT * o.OVERFLOW_SCALE) / o.REGION.height,
          O = -o.REGION.x / o.REGION.width,
          C = -o.REGION.y / o.REGION.height,
          D = () => {
            v.uniform1fv(R, [2, 2, 2, 2]);
          },
          F = d,
          U = m,
          k = null,
          B = () => {
            k &&
              (v.uniform1f(k("u_repetition"), F.repetition),
              v.uniform1f(k("u_softness"), F.softness),
              v.uniform1f(k("u_shiftRed"), F.shiftRed),
              v.uniform1f(k("u_shiftBlue"), F.shiftBlue),
              v.uniform1f(k("u_shadowBlue"), F.shadowBlue),
              v.uniform1f(k("u_distortion"), F.distortion),
              v.uniform1f(k("u_contour"), F.contour),
              v.uniform1f(k("u_angle"), F.angle),
              v.uniform1f(k("u_flow"), F.flow));
          },
          S = () => {
            k && v.uniform1f(k("u_feather"), U.feather);
          },
          N = () =>
            o.BRANCHES.map(
              (e, t) => U.startDelay + (o.BRANCHES.length - 1 - t) * U.stagger,
            ),
          W = N(),
          X = f,
          H = !f,
          z = 0,
          G = !1,
          q = 0,
          j = 0,
          V = !1,
          $ = !0,
          Y = !1,
          J = !1,
          K = 0,
          Q = 0,
          Z = () => {
            let t,
              r = e.clientWidth,
              a = e.clientHeight;
            if (!r || !a) return;
            let i = Math.min(window.devicePixelRatio || 1, 2),
              l = r * a * i * i;
            l > 125e5 && (i *= Math.sqrt(125e5 / l));
            let n = Math.max(1, Math.round(r * i)),
              s = Math.max(1, Math.round(a * i));
            ((e.width !== n || e.height !== s) &&
              ((e.width = n), (e.height = s)),
              v.viewport(0, 0, n, s),
              v.uniform2f(M, n, s),
              (t = Math.min(1, r / a / o.CROP_ASPECT)),
              v.uniform2f(A, P * t, L),
              v.uniform2f(I, O + (P * (1 - t)) / 2, C));
          },
          ee = (e) => {
            (v.uniform1f(T, e * F.speed),
              H ||
                ((e) => {
                  let t = new Float32Array(4),
                    r = !0;
                  for (let o = 0; o < 4; o++) {
                    let a = Math.min(Math.max((e - W[o]) / U.duration, 0), 1);
                    (a < 1 && (r = !1),
                      (t[o] = s(a) * (1 + 2 * U.feather + 0.02)));
                  }
                  (v.uniform1fv(R, t), r && ((H = !0), D()));
                })(e - z),
              v.clearColor(0, 0, 0, 0),
              v.clear(v.COLOR_BUFFER_BIT),
              v.drawArrays(v.TRIANGLES, 0, 3));
          },
          et = (e) => {
            q = requestAnimationFrame(et);
            let t = Q ? Math.min((e - Q) / 1e3, 0.1) : 0;
            ((Q = e), ee((K += t)), Y || ((Y = !0), c()), er() || eo(!1));
          },
          er = () => !!_ && $ && (!Y || (0, r.isOverlayLifted)()),
          eo = (e) => {
            G ||
              e === V ||
              (e && J) ||
              ((V = e),
              e
                ? ((Q = 0), (q = requestAnimationFrame(et)))
                : cancelAnimationFrame(q));
          },
          ea = new ResizeObserver(Z);
        ea.observe(e);
        let ei = new IntersectionObserver(([e]) => {
          (($ = e?.isIntersecting ?? !0), eo(er()));
        });
        ei.observe(e);
        let el = (e) => {
          (e.preventDefault(), eo(!1), h());
        };
        e.addEventListener("webglcontextlost", el);
        let en = (0, r.onOverlayLifted)(() => eo(er())),
          es = () => {
            let e;
            if (((j = 0), !G && g)) {
              var r;
              let o;
              if (!(0, t.isProgramComplete)(v, g)) {
                j = requestAnimationFrame(es);
                return;
              }
              try {
                e = (0, t.finishProgram)(v, g);
              } catch {
                ((g = null), h());
                return;
              }
              ((g = null),
                (_ = r = e),
                v.useProgram(r),
                (o = k = (e) => v.getUniformLocation(r, e)),
                v.uniform1i(o("u_image"), 0),
                v.uniform1i(o("u_meta"), 1),
                v.uniform1i(o("u_edge"), 2),
                B(),
                S(),
                (A = o("u_uvScale")),
                (I = o("u_uvOffset")),
                (T = o("u_time")),
                (M = o("u_resolution")),
                (R = o("u_branchReveal")),
                H && D(),
                Z(),
                eo(!0));
            }
          };
        (Z(), es());
        let eu = () => {
          ((z = K), (H = !1), eo(er()));
        };
        return {
          setParams: (e) => {
            G || ((F = e), B());
          },
          setIntroTiming: (e) => {
            G || ((U = e), (W = N()), S());
          },
          setIntro: (e) => {
            G || ((X = e), e ? eu() : ((H = !0), D()));
          },
          setMask: (e) => {
            G || E(e);
          },
          replayIntro: () => {
            G || eu();
          },
          beginSequence: () => {
            if (G) return null;
            ((J = !0), eo(!1));
            let e = K,
              t = 0;
            return (
              X && ((z = e), (H = !1)),
              {
                frame: (r) => !G && !!_ && ((t = r), ee(e + r), !0),
                end: () => {
                  ((J = !1), (K = e + t), eo(er()));
                },
              }
            );
          },
          dispose: () => {
            ((G = !0),
              cancelAnimationFrame(q),
              0 !== j && cancelAnimationFrame(j),
              (V = !1),
              ea.disconnect(),
              ei.disconnect(),
              e.removeEventListener("webglcontextlost", el),
              en(),
              v.deleteTexture(x),
              v.deleteTexture(w),
              v.deleteTexture(b),
              g && (0, t.disposePendingProgram)(v, g),
              _ && v.deleteProgram(_),
              v.getExtension("WEBGL_lose_context")?.loseContext());
          },
        };
      },
    ],
    852201,
  );
};
factories[183048] = (e) => {
  "use strict";
  e.s([
    "SYMBOL_PATH",
    0,
    "M370.052 140C406.097 140 435.322 169.22 435.324 205.265C435.324 241.311 406.099 270.536 370.052 270.536H334.468C324.776 270.537 315.48 274.388 308.626 281.242L289.163 300.706C278.392 311.476 263.781 317.527 248.549 317.528H204.007C167.963 317.526 138.744 288.308 138.743 252.263C138.743 216.218 167.962 186.993 204.007 186.991H239.591C249.285 186.991 258.585 183.14 265.44 176.286L284.904 156.822C295.675 146.051 310.285 140 325.517 140H370.052ZM334.468 176.547C324.776 176.548 315.48 180.4 308.626 187.253L293.745 202.134C280.037 215.841 261.446 223.544 242.061 223.545H204.007C188.149 223.547 175.29 236.404 175.29 252.263C175.291 268.122 188.149 280.979 204.007 280.98H239.591C249.285 280.98 258.585 277.129 265.44 270.275L280.315 255.393C294.024 241.685 312.619 233.989 332.005 233.989H370.052C385.913 233.989 398.77 221.125 398.77 205.265C398.767 189.406 385.911 176.547 370.052 176.547H334.468Z",
    "SYMBOL_VIEW_BOX",
    0,
    "138.743 140 296.581 177.528",
  ]);
};
factories[419289] =
  factories[238557] =
  factories[914690] =
  factories[444847] =
    (e) => {
      "use strict";
      var t = e.i(79656),
        r = e.i(183048);
      let o = {
        from: { depth: 0.112, bevel: 0.044, roughness: 0.43, yaw: -90 },
        initialDelay: 0.12,
        depthDuration: 0.8,
        depthEase: [0, 0, 0, 1],
        blendDuration: 1.5,
        blendEase: [0.5, 0, 0, 1],
        spinPeriod: 2,
        landMinDuration: 0.6,
      };
      e.s(
        [
          "CHROME_SYMBOL_DEFAULTS",
          0,
          {
            depth: 0.09,
            bevel: 0.032,
            roughness: 0.265,
            yaw: 0,
            pitch: 0,
            sway: 4.5,
            speed: 0,
            fit: 1.125,
            parallax: 1.25,
            exposure: 1.05,
            keyAzimuth: 0,
            keyElevation: 34,
            fillAzimuth: 118,
            fillElevation: 8,
            tintR: 0.95,
            tintG: 0.955,
            tintB: 0.97,
          },
          "CHROME_SYMBOL_INTRO",
          0,
          o,
          "FIELD_BAND",
          0,
          0.09,
          "FIELD_PADDING",
          0,
          0.28,
          "FIELD_PIXELS_PER_UNIT",
          0,
          384,
        ],
        238557,
      );
      let a = /[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/y,
        i = /[\s,]*/y,
        l = r.SYMBOL_VIEW_BOX.split(" ").map(Number);
      function n(e, t, r, o) {
        let [l, n, s, u] = t;
        if (!(u > 0)) return [];
        let f = 1 / u,
          c = l + s / 2 - (o ? o[0] : 0),
          h = n + u / 2 - (o ? o[1] : 0),
          d = [],
          m = [],
          p = (e, t) => {
            m.push((e - c) * f, (h - t) * f);
          },
          v = () => {
            (m.length >= 6 && d.push(Float64Array.from(m)), (m = []));
          },
          g = 0,
          _ = !1,
          x = () => {
            i.lastIndex = g;
            let t = i.exec(e);
            t && (g += t[0].length);
          },
          w = () => {
            (x(), (a.lastIndex = g));
            let t = a.exec(e);
            return t && "" !== t[0] && "." !== t[0]
              ? ((g += t[0].length), Number(t[0]))
              : ((_ = !0), 0);
          },
          b = () => {
            x();
            let t = e[g];
            return "0" === t || "1" === t ? ((g += 1), "1" === t) : 0 !== w();
          },
          y = "",
          E = !1,
          T = 0,
          M = 0,
          R = 0,
          A = 0,
          I = 0,
          P = 0,
          L = 0,
          O = 0,
          C = !1,
          D = !1,
          F = (e, t, o, a, i, l) => {
            let n = Math.min(
              64,
              Math.max(
                3,
                Math.ceil(
                  ((Math.hypot(e - T, t - M) +
                    Math.hypot(o - e, a - t) +
                    Math.hypot(i - o, l - a)) *
                    f) /
                    r,
                ),
              ),
            );
            for (let r = 1; r <= n; r += 1) {
              let s = r / n,
                u = 1 - s;
              p(
                u * u * u * T +
                  3 * u * u * s * e +
                  3 * u * s * s * o +
                  s * s * s * i,
                u * u * u * M +
                  3 * u * u * s * t +
                  3 * u * s * s * a +
                  s * s * s * l,
              );
            }
            ((T = i), (M = l), (I = o), (P = a), (C = !0), (D = !1));
          },
          U = (e, t, o, a) => {
            let i = Math.min(
              64,
              Math.max(
                3,
                Math.ceil(
                  ((Math.hypot(e - T, t - M) + Math.hypot(o - e, a - t)) * f) /
                    r,
                ),
              ),
            );
            for (let r = 1; r <= i; r += 1) {
              let l = r / i,
                n = 1 - l;
              p(
                n * n * T + 2 * n * l * e + l * l * o,
                n * n * M + 2 * n * l * t + l * l * a,
              );
            }
            ((T = o), (M = a), (L = e), (O = t), (D = !0), (C = !1));
          },
          k = (e, t, o, a, i, l, n) => {
            let s = Math.abs(e),
              u = Math.abs(t);
            if (0 === s || 0 === u || (T === l && M === n)) {
              (p(l, n), (T = l), (M = n), (C = !1), (D = !1));
              return;
            }
            let c = (o * Math.PI) / 180,
              h = Math.cos(c),
              d = Math.sin(c),
              m = (T - l) / 2,
              v = (M - n) / 2,
              g = h * m + d * v,
              _ = -d * m + h * v,
              x = (g * g) / (s * s) + (_ * _) / (u * u);
            if (x > 1) {
              let e = Math.sqrt(x);
              ((s *= e), (u *= e));
            }
            let w = s * s,
              b = u * u,
              y = w * _ * _ + b * g * g,
              E = Math.max(0, w * b - y),
              R = 0 === y ? 0 : Math.sqrt(E / y);
            a === i && (R = -R);
            let A = (R * s * _) / u,
              I = (-R * u * g) / s,
              P = h * A - d * I + (T + l) / 2,
              L = d * A + h * I + (M + n) / 2,
              O = Math.atan2((_ - I) / u, (g - A) / s),
              F = Math.atan2((-_ - I) / u, (-g - A) / s) - O;
            (!i && F > 0 && (F -= 2 * Math.PI),
              i && F < 0 && (F += 2 * Math.PI));
            let U = Math.min(
              256,
              Math.max(3, Math.ceil((Math.abs(F) * Math.max(s, u) * f) / r)),
            );
            for (let e = 1; e <= U; e += 1) {
              let t = O + (F * e) / U,
                r = Math.cos(t),
                o = Math.sin(t);
              p(P + s * r * h - u * o * d, L + s * r * d + u * o * h);
            }
            ((T = l), (M = n), (C = !1), (D = !1));
          };
        for (; !_ && (x(), !(g >= e.length));) {
          let t = e[g];
          if (/[a-zA-Z]/.test(t)) {
            let e = t.toUpperCase();
            if (!"MLHVCSQTAZ".includes(e)) break;
            if (((y = e), (E = t !== e), (g += 1), "Z" === y)) {
              (v(), (T = R), (M = A), (C = !1), (D = !1));
              continue;
            }
          } else if (!y || "Z" === y) break;
          let r = E ? T : 0,
            o = E ? M : 0;
          if ("M" === y)
            (v(),
              (T = r + w()),
              (M = o + w()),
              (R = T),
              (A = M),
              _ || p(T, M),
              (C = !1),
              (D = !1),
              (y = "L"));
          else if ("L" === y)
            ((T = r + w()), (M = o + w()), _ || p(T, M), (C = !1), (D = !1));
          else if ("H" === y) ((T = r + w()), _ || p(T, M), (C = !1), (D = !1));
          else if ("V" === y) ((M = o + w()), _ || p(T, M), (C = !1), (D = !1));
          else if ("C" === y) {
            let e = r + w(),
              t = o + w(),
              a = r + w(),
              i = o + w(),
              l = r + w(),
              n = o + w();
            _ || F(e, t, a, i, l, n);
          } else if ("S" === y) {
            let e = C ? 2 * T - I : T,
              t = C ? 2 * M - P : M,
              a = r + w(),
              i = o + w(),
              l = r + w(),
              n = o + w();
            _ || F(e, t, a, i, l, n);
          } else if ("Q" === y) {
            let e = r + w(),
              t = o + w(),
              a = r + w(),
              i = o + w();
            _ || U(e, t, a, i);
          } else if ("T" === y) {
            let e = D ? 2 * T - L : T,
              t = D ? 2 * M - O : M,
              a = r + w(),
              i = o + w();
            _ || U(e, t, a, i);
          } else if ("A" === y) {
            let e = w(),
              t = w(),
              a = w(),
              i = b(),
              l = b(),
              n = r + w(),
              s = o + w();
            _ || k(e, t, a, i, l, n, s);
          }
        }
        return (v(), d);
      }
      function s(e, t, r) {
        let o = e[2] / e[3] / 2,
          a = 4096 / ((Math.max(o, 0.5) + r) * 2),
          i = t > a ? a : t,
          l = Math.ceil((o + r) * 2 * i),
          n = Math.ceil((0.5 + r) * 2 * i);
        return {
          width: l,
          height: n,
          halfWidth: l / (2 * i),
          halfHeight: n / (2 * i),
          glyphHalfWidth: o,
          glyphHalfHeight: 0.5,
          pixelsPerUnit: i,
        };
      }
      let u = s(l, 384, 0.28);
      function f(e, t, r, o) {
        let {
            width: a,
            height: i,
            halfWidth: l,
            halfHeight: n,
            pixelsPerUnit: s,
          } = t,
          u = 1 / s,
          f = new Float32Array(a * i).fill(r),
          c = (e) => (e + l) * s - 0.5,
          h = (e) => (e + n) * s - 0.5,
          d = r * s;
        for (let t of e) {
          let e = t.length / 2;
          for (let r = 0; r < e; r += 1) {
            let o = (r + 1) % e,
              s = t[2 * r],
              m = t[2 * r + 1],
              p = t[2 * o],
              v = t[2 * o + 1],
              g = p - s,
              _ = v - m,
              x = g * g + _ * _;
            if (0 === x) continue;
            let w = Math.max(0, Math.ceil(c(Math.min(s, p)) - d)),
              b = Math.min(a - 1, Math.floor(c(Math.max(s, p)) + d)),
              y = Math.max(0, Math.ceil(h(Math.min(m, v)) - d)),
              E = Math.min(i - 1, Math.floor(h(Math.max(m, v)) + d));
            for (let e = y; e <= E; e += 1) {
              let t = (e + 0.5) * u - n - m,
                r = e * a;
              for (let e = w; e <= b; e += 1) {
                let o = (e + 0.5) * u - l - s,
                  a = (o * g + t * _) / x,
                  i = o - g * (a = a < 0 ? 0 : a > 1 ? 1 : a),
                  n = t - _ * a,
                  c = Math.sqrt(i * i + n * n);
                c < f[r + e] && (f[r + e] = c);
              }
            }
          }
        }
        let m = (e, t, r) => {
          let o = Math.max(0, Math.ceil(c(t))),
            i = Math.min(a - 1, Math.floor(c(r)));
          for (let t = o; t <= i; t += 1) f[e + t] *= -1;
        };
        if ("evenodd" === o) {
          let t = [];
          for (let r = 0; r < i; r += 1) {
            let o = (r + 0.5) * u - n;
            for (let r of ((t.length = 0), e)) {
              let e = r.length / 2;
              for (let a = 0; a < e; a += 1) {
                let i = (a + 1) % e,
                  l = r[2 * a + 1],
                  n = r[2 * i + 1];
                if (l <= o == n <= o) continue;
                let s = r[2 * a],
                  u = r[2 * i];
                t.push(s + ((o - l) / (n - l)) * (u - s));
              }
            }
            if (0 === t.length) continue;
            t.sort((e, t) => e - t);
            let i = r * a;
            for (let e = 0; e + 1 < t.length; e += 2) m(i, t[e], t[e + 1]);
          }
        } else {
          let t = [];
          for (let r = 0; r < i; r += 1) {
            let o = (r + 0.5) * u - n;
            for (let r of ((t.length = 0), e)) {
              let e = r.length / 2;
              for (let a = 0; a < e; a += 1) {
                let i = (a + 1) % e,
                  l = r[2 * a + 1],
                  n = r[2 * i + 1];
                if (l <= o == n <= o) continue;
                let s = r[2 * a],
                  u = r[2 * i];
                t.push({
                  at: s + ((o - l) / (n - l)) * (u - s),
                  direction: n > l ? 1 : -1,
                });
              }
            }
            if (0 === t.length) continue;
            t.sort((e, t) => e.at - t.at);
            let i = r * a,
              l = 0;
            for (let e = 0; e + 1 < t.length; e += 1)
              0 !== (l += t[e].direction) && m(i, t[e].at, t[e + 1].at);
          }
        }
        return { ...t, data: f, band: r };
      }
      function c(e, t, o) {
        var a;
        let i = s(l, e, t);
        return f(
          ((a = (1 / i.pixelsPerUnit) * 0.35), n(r.SYMBOL_PATH, l, a)),
          i,
          o,
          "evenodd",
        );
      }
      function h(e, t, r, o) {
        let a = s(e.viewBox, t, r),
          i = (1 / a.pixelsPerUnit) * 0.35,
          l = [],
          u = 0,
          c = !1;
        for (let t of e.paths)
          if (("evenodd" === t.fillRule && (c = !0), !(u >= 5e4)))
            for (let r of n(t.d, e.viewBox, i, t.offset)) {
              if (u >= 5e4) break;
              (l.push(r), (u += r.length / 2));
            }
        return f(l, a, o, c ? "evenodd" : "nonzero");
      }
      function d([e, t, r, o]) {
        let a = (e, t, r) =>
            ((1 - 3 * r + 3 * t) * e * e + (3 * r - 6 * t) * e + 3 * t) * e,
          i = (e, t, r) =>
            3 * (1 - 3 * r + 3 * t) * e * e + 2 * (3 * r - 6 * t) * e + 3 * t;
        return (l) =>
          l <= 0
            ? 0
            : l >= 1
              ? 1
              : a(
                  ((t) => {
                    let o = t;
                    for (let l = 0; l < 8; l++) {
                      let l = a(o, e, r) - t;
                      if (1e-6 > Math.abs(l)) return o;
                      let n = i(o, e, r);
                      if (1e-6 > Math.abs(n)) break;
                      o -= l / n;
                    }
                    let l = 0,
                      n = 1;
                    for (; n - l > 1e-6;)
                      a((o = (l + n) / 2), e, r) < t ? (l = o) : (n = o);
                    return o;
                  })(l),
                  t,
                  o,
                );
      }
      function m(e, { spin: t = !1, onLanded: r } = {}) {
        let {
            initialDelay: a,
            depthDuration: i,
            depthEase: l,
            blendDuration: n,
            blendEase: s,
            spinPeriod: u,
            landMinDuration: f,
          } = o,
          c = d(l),
          h = d(s),
          p = i + n,
          v = 360 / u,
          g = !1,
          _ = !1,
          x = 0,
          w = 0,
          b = 0,
          y = 0,
          E = (e) => (_ || ((_ = !0), r?.()), e),
          T = (e, t) => e.yaw + v * (t - p);
        return {
          sample: (r) => {
            let l = Math.max(0, r - a),
              s = e();
            if (_) return s;
            let u = { ...s, ...o.from };
            if (l < i) return { ...u, depth: u.depth * c(l / i) };
            if (l < p) {
              var f = h((l - i) / n);
              let e = { ...u };
              for (let t of Object.keys(u)) e[t] = u[t] + (s[t] - u[t]) * f;
              return e;
            }
            if (!t || (g && 0 === y)) return E(s);
            if (0 === y) return { ...s, yaw: T(s, l) };
            let d = (l - x) / y;
            return d >= 1
              ? E(s)
              : { ...s, yaw: w + (b - w) * (d + d * d - d * d * d) };
          },
          land: (r) => {
            let o = Math.max(0, r - a);
            if (!g && ((g = !0), t && !(o <= p))) {
              var i;
              let t, r;
              ((t = T((i = e()), o)),
                (r = i.yaw + 360 * Math.ceil((t - i.yaw) / 360)) - t < 0.001 &&
                  (r += 360),
                (x = o),
                (w = t),
                (b = r),
                (y = Math.max(f, (r - t) / v)));
            }
          },
          isFinished: () => _,
        };
      }
      (e.s(
        [
          "SYMBOL_FIELD_EXTENT",
          0,
          u,
          "buildShapeField",
          0,
          h,
          "buildSymbolField",
          0,
          c,
          "shapeFieldExtent",
          0,
          s,
        ],
        914690,
      ),
        e.s(["createIntroTimeline", 0, m, "cubicBezier", 0, d], 444847));
      let p = `#version 300 es
precision highp float;

void main() {
  vec2 pos = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(pos * 2. - 1., 0., 1.);
}
`,
        v = `#version 300 es
precision highp float;
precision highp sampler2D;

uniform sampler2D u_field;
uniform vec2 u_resolution;
uniform vec2 u_half;
uniform vec2 u_view;
uniform vec3 u_bounds;
uniform mat3 u_toObject;
uniform mat3 u_toWorld;
uniform float u_depth;
uniform float u_bevel;
uniform float u_roughness;
uniform float u_parallax;
uniform float u_exposure;
uniform float u_pixel;
uniform float u_normalEps;
uniform vec3 u_key;
uniform vec3 u_fill;
uniform vec3 u_tint;

out vec4 fragColor;

const int MAX_STEPS = 96;
const float HIT = 2e-4;

float field2d(vec2 p) {
  return texture(u_field, p / (2. * u_half) + .5).r;
}

float map(vec3 p) {
  vec2 q = vec2(field2d(p.xy) + u_bevel, abs(p.z) - (u_depth - u_bevel));
  return min(max(q.x, q.y), 0.) + length(max(q, vec2(0.))) - u_bevel;
}

vec3 mapNormal(vec3 p) {
  vec2 e = vec2(u_normalEps, 0.);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

float occlusion(vec3 p, vec3 n) {
  float sum = 0.;
  float weight = 1.;
  for (int i = 1; i <= 4; i++) {
    float h = .014 * float(i);
    sum += weight * (h - map(p + n * h));
    weight *= .62;
  }
  return clamp(1. - 2.4 * sum, 0., 1.);
}

bool slab(vec3 ro, vec3 rd, vec3 bounds, out float tNear, out float tFar) {
  vec3 safe = vec3(
    abs(rd.x) < 1e-5 ? 1e-5 : rd.x,
    abs(rd.y) < 1e-5 ? 1e-5 : rd.y,
    abs(rd.z) < 1e-5 ? 1e-5 : rd.z
  );
  vec3 a = (-bounds - ro) / safe;
  vec3 b = (bounds - ro) / safe;
  vec3 lo = min(a, b);
  vec3 hi = max(a, b);
  tNear = max(max(lo.x, lo.y), lo.z);
  tFar = min(min(hi.x, hi.y), hi.z);
  return tFar > max(tNear, 0.);
}

vec3 environment(vec3 d) {
  float y = d.y;
  float blur = .008 + u_roughness * .3;
  vec3 ground = mix(vec3(.014, .016, .022), vec3(.075, .08, .095), smoothstep(-.75, -.03, y));
  vec3 sky = mix(vec3(.6, .63, .69), vec3(.95, .96, 1.01), smoothstep(.03, .7, y));
  vec3 color = mix(ground, sky, smoothstep(-blur, blur, y));
  color += vec3(1., .99, .96) * 1.05 * (1. - smoothstep(.05, .05 + blur * 5., abs(y - .21)));
  color += vec3(.95, .97, 1.) * .6 * (1. - smoothstep(.03, .03 + blur * 5., abs(y + .55)));
  color += vec3(.7, .78, 1.) * .2 * (1. - smoothstep(.04, .04 + blur * 5., abs(y + .28)));
  float sharp = clamp(2. / max(u_roughness * u_roughness, 1e-4), 4., 320.);
  color += vec3(1.) * 5. * pow(max(dot(d, u_key), 0.), sharp);
  color += vec3(.9, .94, 1.) * .8 * pow(max(dot(d, u_fill), 0.), sharp * .12);
  return color;
}

vec3 tonemap(vec3 x) {
  return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0., 1.);
}

void main() {
  vec2 screen = (gl_FragCoord.xy / u_resolution * 2. - 1.) * u_view;
  vec3 ro = u_toObject * vec3(screen, u_bounds.z + 1.);
  vec3 rd = u_toObject * vec3(0., 0., -1.);

  float margin = 2. * u_pixel + .001;
  float tNear = 0.;
  float tFar = 0.;
  if (!slab(ro, rd, u_bounds + margin, tNear, tFar)) discard;

  float erode = .5 * u_pixel;
  float t = max(tNear, 0.);
  float closest = 1e9;
  float closestT = t;
  for (int i = 0; i < MAX_STEPS; i++) {
    if (t > tFar) break;
    float d = map(ro + rd * t) + erode;
    if (d < closest) {
      closest = d;
      closestT = t;
    }
    if (d < HIT) break;
    t += max(d, HIT);
  }

  float coverage = 1. - smoothstep(0., 2. * erode, closest);
  if (coverage <= .002) discard;

  vec3 surface = ro + rd * closestT;
  vec3 normal = mapNormal(surface);
  vec3 world = u_toWorld * normal;
  vec3 view = vec3(0., 0., 1.);
  vec3 reflected = reflect(-view, world);
  vec3 envDir = normalize(reflected + (u_toWorld * surface) * u_parallax);

  vec3 f0 = clamp(u_tint, 0., 1.) * .93;
  vec3 fresnel = f0 + (1. - f0) * pow(1. - clamp(dot(world, view), 0., 1.), 5.);
  vec3 color = environment(envDir) * fresnel * occlusion(surface, normal);

  color = pow(tonemap(color * u_exposure), vec3(1. / 2.2));
  float dither = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(.06711056, .00583715)))) - .5;
  color = clamp(color + dither / 255., 0., 1.);

  fragColor = vec4(color * coverage, coverage);
}
`,
        g = Math.PI / 180,
        _ = [
          "field",
          "resolution",
          "half",
          "view",
          "bounds",
          "toObject",
          "toWorld",
          "depth",
          "bevel",
          "roughness",
          "parallax",
          "exposure",
          "pixel",
          "normalEps",
          "key",
          "fill",
          "tint",
        ],
        x = "function" == typeof requestAnimationFrame,
        w = null,
        b = new Map();
      function y(e, t) {
        let r = e * g,
          o = t * g;
        return [
          Math.cos(o) * Math.sin(r),
          Math.sin(o),
          Math.cos(o) * Math.cos(r),
        ];
      }
      e.s(
        [
          "createSession",
          0,
          function ({
            canvas: e,
            params: r,
            intro: o,
            spin: a,
            width: i,
            height: l,
            shape: n,
            preserveDrawingBuffer: s = !1,
            onLive: u,
            onLanded: f,
          }) {
            let d = e.getContext("webgl2", {
              alpha: !0,
              antialias: !1,
              depth: !1,
              stencil: !1,
              premultipliedAlpha: !0,
              preserveDrawingBuffer: s,
            });
            if (!d) return null;
            let E = null;
            try {
              E = (0, t.linkProgramAsync)(d, p, v);
            } catch {
              return (
                d.getExtension("WEBGL_lose_context")?.loseContext(),
                null
              );
            }
            let T = n
                ? (function (e) {
                    let t = JSON.stringify(e),
                      r = b.get(t);
                    if (r) return (b.delete(t), b.set(t, r), r);
                    let o = h(e, 384, 0.28, 0.09);
                    if ((b.set(t, o), b.size > 4)) {
                      let e = b.keys().next();
                      e.done || b.delete(e.value);
                    }
                    return o;
                  })(n)
                : (w || (w = c(384, 0.28, 0.09)), w),
              M = (function (e, t) {
                let r = e.createTexture();
                if (!r) return null;
                (e.bindTexture(e.TEXTURE_2D, r),
                  e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
                  e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR),
                  e.texParameteri(
                    e.TEXTURE_2D,
                    e.TEXTURE_WRAP_S,
                    e.CLAMP_TO_EDGE,
                  ),
                  e.texParameteri(
                    e.TEXTURE_2D,
                    e.TEXTURE_WRAP_T,
                    e.CLAMP_TO_EDGE,
                  ));
                for (let t = 0; t < 8 && e.getError() !== e.NO_ERROR; t += 1);
                return (e.texImage2D(
                  e.TEXTURE_2D,
                  0,
                  e.R16F,
                  t.width,
                  t.height,
                  0,
                  e.RED,
                  e.FLOAT,
                  t.data,
                ),
                e.getError() === e.NO_ERROR ||
                  (e.getExtension("OES_texture_float_linear") &&
                    (e.texImage2D(
                      e.TEXTURE_2D,
                      0,
                      e.R32F,
                      t.width,
                      t.height,
                      0,
                      e.RED,
                      e.FLOAT,
                      t.data,
                    ),
                    e.getError() === e.NO_ERROR)))
                  ? r
                  : (e.deleteTexture(r), null);
              })(d, T);
            if (!M)
              return (
                (0, t.disposePendingProgram)(d, E),
                d.getExtension("WEBGL_lose_context")?.loseContext(),
                null
              );
            let R = { ...r },
              A = new Float32Array(9),
              I = new Float32Array(9),
              P = null,
              L = null,
              O = Math.max(1, Math.round(i)),
              C = Math.max(1, Math.round(l)),
              D = 1,
              F = !0,
              U = !1,
              k = !1,
              B = !1,
              S = !1,
              N = !1,
              W = !0,
              X = !0,
              H = 0,
              z = 0,
              G = 0,
              q = 0,
              j = 0,
              V = () =>
                m(() => R, {
                  spin: a,
                  onLanded: () => {
                    ((k = !0), f());
                  },
                }),
              $ = o ? V() : null,
              Y = () => {
                if (!L) return;
                let e = T.halfHeight / D;
                (d.uniform2f(L.view, (e * O) / C, e),
                  d.uniform1f(L.pixel, (2 * e) / C));
              },
              J = (e) => {
                if (!L) return;
                D = e.fit > 0 ? e.fit : 1;
                let [t, r, o] = y(e.keyAzimuth, e.keyElevation),
                  [a, i, l] = y(e.fillAzimuth, e.fillElevation);
                (d.uniform3f(
                  L.bounds,
                  T.glyphHalfWidth,
                  T.glyphHalfHeight,
                  e.depth,
                ),
                  d.uniform1f(L.depth, e.depth),
                  d.uniform1f(L.bevel, Math.min(e.bevel, 0.98 * e.depth)),
                  d.uniform1f(L.roughness, e.roughness),
                  d.uniform1f(L.parallax, e.parallax),
                  d.uniform1f(L.exposure, e.exposure),
                  d.uniform3f(L.key, t, r, o),
                  d.uniform3f(L.fill, a, i, l),
                  d.uniform3f(L.tint, e.tintR, e.tintG, e.tintB),
                  Y());
              },
              K = () => {
                L &&
                  X &&
                  ((X = !1),
                  (e.width = O),
                  (e.height = C),
                  d.viewport(0, 0, O, C),
                  d.uniform2f(L.resolution, O, C),
                  Y());
              },
              Q = (e) => {
                let t, r, o, a;
                if (!L) return;
                let i = (e.yaw + e.sway * Math.sin(0.8 * q)) * g,
                  l = (e.pitch + 0.55 * e.sway * Math.sin(0.53 * q + 1.1)) * g;
                ((t = Math.cos(i)),
                  (r = Math.sin(i)),
                  (o = Math.cos(l)),
                  (a = Math.sin(l)),
                  (A[0] = t),
                  (A[1] = 0),
                  (A[2] = r),
                  (A[3] = r * a),
                  (A[4] = o),
                  (A[5] = -t * a),
                  (A[6] = -r * o),
                  (A[7] = a),
                  (A[8] = t * o),
                  (I[0] = A[0]),
                  (I[1] = A[3]),
                  (I[2] = A[6]),
                  (I[3] = A[1]),
                  (I[4] = A[4]),
                  (I[5] = A[7]),
                  (I[6] = A[2]),
                  (I[7] = A[5]),
                  (I[8] = A[8]),
                  d.uniformMatrix3fv(L.toObject, !1, A),
                  d.uniformMatrix3fv(L.toWorld, !1, I),
                  d.clearColor(0, 0, 0, 0),
                  d.clear(d.COLOR_BUFFER_BIT),
                  d.drawArrays(d.TRIANGLES, 0, 3),
                  U || ((U = !0), u(!0)));
              },
              Z = () => {
                let e;
                if (P) return !0;
                if (!E || !(0, t.isProgramComplete)(d, E)) return !1;
                try {
                  e = (0, t.finishProgram)(d, E);
                } catch {
                  return ((E = null), eo(), !1);
                }
                return (
                  (E = null),
                  (P = e),
                  d.useProgram(e),
                  (L = Object.fromEntries(
                    _.map((t) => [t, d.getUniformLocation(e, `u_${t}`)]),
                  )),
                  d.uniform1i(L.field, 0),
                  d.uniform2f(L.half, T.halfWidth, T.halfHeight),
                  d.uniform1f(L.normalEps, 1.25 / T.pixelsPerUnit),
                  (X = !0),
                  (W = !0),
                  !0
                );
              },
              ee = (e) => {
                if (((H = 0), B)) return;
                if (!Z()) {
                  B || et();
                  return;
                }
                (0 === z && (z = e),
                  0 !== G && (q += Math.min((e - G) / 1e3, 0.1) * R.speed),
                  (G = e),
                  (j = (e - z) / 1e3),
                  K());
                let t = $ && !$.isFinished() ? $.sample(j) : null;
                (t ? J(t) : W && (J(R), (W = !1)), Q(t ?? R), et());
              },
              et = () => {
                !B &&
                  !S &&
                  !N &&
                  0 === H &&
                  F &&
                  (!P || ($ && !$.isFinished()) || 0 !== R.speed || W || X) &&
                  (H = x
                    ? requestAnimationFrame(ee)
                    : setTimeout(() => ee(performance.now()), 16));
              },
              er = () => {
                if (0 !== H) {
                  var e;
                  ((e = H),
                    x ? cancelAnimationFrame(e) : clearTimeout(e),
                    (H = 0));
                }
              };
            function eo() {
              ((S = !0), er(), (U = !1), u(!1));
            }
            let ea = (e) => {
              (e.preventDefault(), eo());
            };
            return (
              e.addEventListener("webglcontextlost", ea),
              et(),
              {
                setParams: (e) => {
                  (Object.assign(R, e), (W = !0), et());
                },
                resize: (e, t) => {
                  let r = Math.max(1, Math.round(e)),
                    o = Math.max(1, Math.round(t));
                  (r !== O || o !== C) && ((O = r), (C = o), (X = !0), et());
                },
                setVisible: (e) => {
                  e !== F && ((F = e), e ? et() : (er(), (G = 0)));
                },
                land: () => {
                  if (!$) {
                    if (k) return;
                    ((k = !0), f());
                    return;
                  }
                  ($.land(j), et());
                },
                replayIntro: () => {
                  (($ = V()), (k = !1), (z = 0), (W = !0), et());
                },
                beginSequence: () => {
                  ((N = !0), er());
                  let e = o ? m(() => R, { spin: a }) : null;
                  return {
                    frame: (t) => {
                      if (B || S || !Z()) return !1;
                      (K(), (q = t * R.speed));
                      let r = e && !e.isFinished() ? e.sample(t) : null;
                      return (J(r ?? R), Q(r ?? R), !0);
                    },
                    land: (t) => e?.land(t),
                    end: () => {
                      ((N = !1), (W = !0), (G = 0), et());
                    },
                  };
                },
                dispose: () => {
                  ((B = !0),
                    er(),
                    e.removeEventListener("webglcontextlost", ea),
                    E && (0, t.disposePendingProgram)(d, E),
                    d.deleteTexture(M),
                    P && d.deleteProgram(P),
                    d.getExtension("WEBGL_lose_context")?.loseContext());
                },
              }
            );
          },
        ],
        419289,
      );
    };
factories[595687] =
  factories[682276] =
  factories[50005] =
    (e) => {
      "use strict";
      const o = read(695150);
      let i = {
        speed: 0.11,
        initialTime: 0,
        zoom: 0.9,
        iterations: 4,
        sampleGap: 0.005,
        tangentForce: 0.81,
        gradientForce: 0.08,
        brightness: 1,
        contrast: 1,
        backgroundColor: "#000000ff",
        opacity: 1,
        radialMix: 1,
        beams: 5,
        radialStretch: 0.49,
        radialFlow: 3,
        radialSpin: 0.2,
        beamWidth: 0.2,
        twist: 1.4,
        vortex: 0,
        hole: 0,
        centerX: 0.5,
        centerY: 0.5,
        vignette: 0,
        colorMode: "stripes",
        colorA: "#fafaff",
        colorB: "#000000",
        colorC: "#8b93a6",
        tintColor: "#ffffff00",
        repetition: 1.1,
        softness: 0.2,
        bandWidth: 0.12,
        shiftRed: 0,
        shiftBlue: 0,
        stripeFlow: -1.69,
        stripeRadial: 0,
        spread: 0.02,
        threshold: 0.72,
        detailFade: 0,
        fadeLeft: 0,
        fadeRight: 0,
        fadeTop: 0,
        fadeBottom: 0,
      };
      e.s(["METALLIC_SWIRL_DEFAULTS", 0, i], 595687);
      var n = e.i(79656);
      let l = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,
        s = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform float uTime;
uniform vec2 uRes;
uniform float uZoom;
uniform float uIter;
uniform float uEps;
uniform float uTangent;
uniform float uGrad;
uniform float uBright;
uniform float uContrast;
uniform vec4 uBg;
uniform float uAlpha;
uniform float uRadial;
uniform float uBeams;
uniform float uStretch;
uniform float uFlow;
uniform float uSpinPhase;
uniform float uBeamWidth;
uniform float uTwist;
uniform float uVortex;
uniform float uHole;
uniform vec2 uCenter;
uniform float uVignette;
uniform int uColorMode;
uniform vec4 uColorA;
uniform vec4 uColorB;
uniform vec4 uColorC;
uniform vec4 uTint;
uniform float uRepetition;
uniform float uSoftness;
uniform float uBandWidth;
uniform float uShiftRed;
uniform float uShiftBlue;
uniform float uStripePhase;
uniform float uStripeRadial;
uniform float uSpread;
uniform float uThreshold;
uniform float uDetailFade;
uniform float uFadeLeft;
uniform float uFadeRight;
uniform float uFadeTop;
uniform float uFadeBottom;

float edgeFade(float v, float width) {
  return width > 0.0001 ? smoothstep(0.0, width, v) : 1.0;
}

float detailMask(float cyclesPerPx) {
  return 1.0 - uDetailFade * smoothstep(0.05, 0.2, cyclesPerPx);
}

float stripe(float c1, float c2, float c3, float p, vec3 w, float blur, float bump, float tint) {
  float ch = mix(c2, c1, smoothstep(0.0, 2.0 * blur, p));
  float border = w[0];
  ch = mix(ch, c3, smoothstep(border, border + 2.0 * blur, p));
  border = w[0] + 0.4 * (1.0 - bump) * w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2.0 * blur, p));
  border = w[0] + 0.5 * (1.0 - bump) * w[1];
  ch = mix(ch, c3, smoothstep(border, border + 2.0 * blur, p));
  border = w[0] + w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2.0 * blur, p));
  float gradientT = (p - w[0] - w[1]) / w[2];
  float gradient = mix(c3, c2, smoothstep(0.0, uSpread, gradientT));
  ch = mix(ch, gradient, smoothstep(border, border + 0.5 * blur, p));
  ch = mix(ch, 1.0 - min(1.0, (1.0 - ch) / max(tint, 0.0001)), uTint.a);
  return ch;
}

vec4 stripeColor(float val, float r, float t) {
  float bump = clamp(1.0 - pow(r / uZoom * 1.8, 1.2), 0.0, 1.0);
  float direction = val / 6.28318 * uRepetition - uStripePhase + uStripeRadial * r / uZoom;
  float thin1 = uBandWidth / uRepetition * (1.0 - 0.4 * bump);
  float thin2 = uBandWidth * 0.5833 / uRepetition * (1.0 + 0.4 * bump);
  vec3 w = vec3(thin1 * uRepetition, thin2 * uRepetition, 1.0 - thin1 - thin2);
  w[1] -= 0.02 * smoothstep(0.0, 1.0, bump);
  float dispersion = clamp(1.0 - bump, 0.0, 1.0);
  float dR = dispersion * uShiftRed / 20.0;
  float dB = dispersion * 1.3 * uShiftBlue / 20.0;
  float blur = uSoftness / 3.0;
  float sR = fract(direction + dR);
  float sG = fract(direction);
  float sB = fract(direction - dB);
  vec3 pA = uColorA.rgb * uColorA.a;
  vec3 pB = uColorB.rgb * uColorB.a;
  vec3 pC = uColorC.rgb * uColorC.a;
  float density = min(fwidth(sG), fwidth(fract(direction + 0.5)));
  return vec4(
    stripe(pA.r, pB.r, pC.r, sR, w, blur + fwidth(sR), bump, uTint.r),
    stripe(pA.g, pB.g, pC.g, sG, w, blur + fwidth(sG), bump, uTint.g),
    stripe(pA.b, pB.b, pC.b, sB, w, blur + fwidth(sB), bump, uTint.b),
    stripe(uColorA.a, uColorB.a, uColorC.a, sG, w, blur + fwidth(sG), bump, 1.0)
  ) * detailMask(density);
}

float ramp(float c1, float c2, float c3, float s, float tint) {
  float ch = s < 0.5 ? mix(c2, c3, s * 2.0) : mix(c3, c1, s * 2.0 - 1.0);
  ch = mix(ch, 1.0 - min(1.0, (1.0 - ch) / max(tint, 0.0001)), uTint.a);
  return ch;
}

vec4 phaseColor(float val, float along, float r) {
  val += uStripeRadial * 6.28318 * r / uZoom;
  float bump = clamp(1.0 - pow(r / uZoom * 1.8, 1.2), 0.0, 1.0);
  float dispersion = clamp(1.0 - bump, 0.0, 1.0);
  float dR = clamp(dispersion * uShiftRed * 12.0 * along, -4.0, 4.0);
  float dB = clamp(dispersion * uShiftBlue * 12.0 * along, -4.0, 4.0);
  float soft = mix(0.02, 0.5, uSoftness) + min(abs(along), 0.2) * 0.5;
  vec3 s = sin(3.11 + vec3(val + dR, val, val - dB)) * 0.5 + 0.5;
  s = smoothstep(vec3(uThreshold - soft), vec3(uThreshold + soft), s);
  vec3 pA = uColorA.rgb * uColorA.a;
  vec3 pB = uColorB.rgb * uColorB.a;
  vec3 pC = uColorC.rgb * uColorC.a;
  return vec4(
    ramp(pA.r, pB.r, pC.r, s.r, uTint.r),
    ramp(pA.g, pB.g, pC.g, s.g, uTint.g),
    ramp(pA.b, pB.b, pC.b, s.b, uTint.b),
    ramp(uColorA.a, uColorB.a, uColorC.a, s.g, 1.0)
  ) * detailMask(fwidth(val) / 6.28318);
}

float sharpen(float c, float k, float w) {
  float m = max(abs(c), max(w, 1e-4));
  return c / m * pow(m, k);
}

float wave(vec2 p, float t) {
  return sin(p.x + sin(p.y + t * 0.1)) * sin(p.y * p.x * 0.1 + t * 0.2);
}

vec2 flow(vec2 st, float t) {
  float r = length(st);
  float a = atan(st.y, st.x) + uSpinPhase + log(r + 0.05) * uTwist + uVortex / (r + 0.15);
  float pxSt = uZoom / uRes.y;
  float daPx = pxSt * (1.0 / max(r, 0.001) + abs(uTwist) / (r + 0.05) + abs(uVortex) / ((r + 0.15) * (r + 0.15)));
  float angular = sharpen(cos(a * uBeams), uBeamWidth, daPx * uBeams) + 0.5 * sharpen(sin(a * (uBeams + 1.0) + t * 0.3), uBeamWidth, daPx * (uBeams + 1.0));
  vec2 polar = vec2(angular * 3.14159, log(r + 0.05) * uStretch);
  float centerFade = smoothstep(0.0, 0.15 * uZoom, r);
  float radialMix = uRadial * centerFade;

  vec2 ep = vec2(uEps, 0.0);
  vec2 p = mix(st, polar, radialMix);
  float localT = t - r * uFlow * radialMix;
  vec2 outV = vec2(0.0);

  for (int i = 0; i < 12; i++) {
    float w = clamp(uIter - float(i), 0.0, 1.0);
    if (w <= 0.0) break;
    float s0 = wave(p, localT);
    float sx = wave(p + ep, localT);
    float sy = wave(p + ep.yx, localT);
    vec2 g = vec2(sx - s0, sy - s0) / ep.xx;
    vec2 tang = vec2(-g.y, g.x);
    p += (uTangent * tang + g * uGrad) * w;
    outV = mix(outV, tang, w);
  }
  return outV;
}

void main() {
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);
  vec2 st = (vUv - uCenter) * aspect * uZoom;
  float t = uTime;
  float r = length(st);

  vec2 outV = flow(st, t);
  vec4 layer;
  if (uColorMode == 1) {
    layer = stripeColor(atan(outV.y, outV.x), r, t);
  } else {
    vec2 dir = st / max(r, 0.001);
    vec2 px = dir * (uZoom / uRes.y);
    vec2 outA = flow(st + px, t);
    vec2 outB = flow(st - px, t);
    float along = ((outA.x - outA.y) - (outB.x - outB.y)) * 0.5;
    layer = phaseColor(outV.x - outV.y, along, r);
  }
  vec3 col = layer.rgb;
  float cover = layer.a;
  col = (col - 0.5 * cover) * uContrast + 0.5 * cover;
  col *= uBright;
  float vd = length((vUv - 0.5) * aspect) / length(aspect * 0.5);
  float edges = edgeFade(vUv.x, uFadeLeft) * edgeFade(1.0 - vUv.x, uFadeRight) * edgeFade(1.0 - vUv.y, uFadeTop) * edgeFade(vUv.y, uFadeBottom);
  float shape = smoothstep(0.0, max(uHole * uZoom * 0.25, 0.001), r) * (1.0 - uVignette * smoothstep(0.35, 1.1, vd)) * edges;
  col *= shape;
  cover *= shape;

  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float mask = clamp(lum * 4.0, 0.0, 1.0);

  vec3 rgb = mix(uBg.rgb, col, mask);
  float alpha = (uBg.a + (1.0 - uBg.a) * cover * mask) * uAlpha;

  fragColor = vec4(rgb, alpha);
}
`;
      e.s(
        [
          "FRAGMENT_SHADER",
          0,
          s,
          "MAX_ITERATIONS",
          0,
          12,
          "VERTEX_SHADER",
          0,
          l,
        ],
        50005,
      );
      let u = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        d = (e) => {
          let t,
            r = e.replace("#", ""),
            o = (e) =>
              e
                .split("")
                .map((e) => e + e)
                .join("");
          return [
            parseInt(
              (t =
                3 === r.length
                  ? o(r) + "ff"
                  : 4 === r.length
                    ? o(r)
                    : 6 === r.length
                      ? r + "ff"
                      : r).slice(0, 2),
              16,
            ) / 255,
            parseInt(t.slice(2, 4), 16) / 255,
            parseInt(t.slice(4, 6), 16) / 255,
            parseInt(t.slice(6, 8), 16) / 255,
          ];
        };
      function f(
        e,
        { params: t, animated: r, capture: a = !1, onReady: i, onError: c },
      ) {
        let m = e.getContext("webgl2", {
          antialias: !0,
          alpha: !0,
          premultipliedAlpha: !0,
          preserveDrawingBuffer: a,
        });
        if (!m) throw Error("webgl2 unavailable");
        let p = (0, n.linkProgramAsync)(m, l, s),
          h = null,
          g = m.createBuffer();
        (m.bindBuffer(m.ARRAY_BUFFER, g),
          m.bufferData(m.ARRAY_BUFFER, u, m.STATIC_DRAW),
          m.enable(m.BLEND),
          m.blendFuncSeparate(
            m.ONE,
            m.ONE_MINUS_SRC_ALPHA,
            m.ONE,
            m.ONE_MINUS_SRC_ALPHA,
          ));
        let _ = (e) => (h ? m.getUniformLocation(h, e) : null),
          v = () => ({
            time: _("uTime"),
            res: _("uRes"),
            zoom: _("uZoom"),
            iter: _("uIter"),
            eps: _("uEps"),
            tangent: _("uTangent"),
            grad: _("uGrad"),
            bright: _("uBright"),
            contrast: _("uContrast"),
            bg: _("uBg"),
            alpha: _("uAlpha"),
            radial: _("uRadial"),
            beams: _("uBeams"),
            stretch: _("uStretch"),
            flow: _("uFlow"),
            spinPhase: _("uSpinPhase"),
            beamWidth: _("uBeamWidth"),
            twist: _("uTwist"),
            vortex: _("uVortex"),
            hole: _("uHole"),
            center: _("uCenter"),
            vignette: _("uVignette"),
            colorMode: _("uColorMode"),
            colorA: _("uColorA"),
            colorB: _("uColorB"),
            colorC: _("uColorC"),
            tint: _("uTint"),
            repetition: _("uRepetition"),
            softness: _("uSoftness"),
            bandWidth: _("uBandWidth"),
            shiftRed: _("uShiftRed"),
            shiftBlue: _("uShiftBlue"),
            stripePhase: _("uStripePhase"),
            stripeRadial: _("uStripeRadial"),
            spread: _("uSpread"),
            threshold: _("uThreshold"),
            detailFade: _("uDetailFade"),
            fadeLeft: _("uFadeLeft"),
            fadeRight: _("uFadeRight"),
            fadeTop: _("uFadeTop"),
            fadeBottom: _("uFadeBottom"),
          }),
          w = v(),
          b = { ...t },
          x = () => {
            let [e, t, r, o] = d(b.backgroundColor),
              [a, i, n, l] = d(b.colorA),
              [s, u, f, c] = d(b.colorB),
              [p, h, g, _] = d(b.colorC),
              [v, x, y, R] = d(b.tintColor);
            (m.uniform1f(w.zoom, b.zoom),
              m.uniform1f(w.iter, b.iterations),
              m.uniform1f(w.eps, Math.max(b.sampleGap, 1e-4)),
              m.uniform1f(w.tangent, b.tangentForce),
              m.uniform1f(w.grad, b.gradientForce),
              m.uniform1f(w.bright, b.brightness),
              m.uniform1f(w.contrast, b.contrast),
              m.uniform4f(w.bg, e, t, r, o),
              m.uniform1f(w.alpha, b.opacity),
              m.uniform1f(w.radial, b.radialMix),
              m.uniform1f(w.beams, Math.round(b.beams)),
              m.uniform1f(w.stretch, b.radialStretch),
              m.uniform1f(w.flow, b.radialFlow),
              m.uniform1f(w.beamWidth, b.beamWidth),
              m.uniform1f(w.twist, b.twist),
              m.uniform1f(w.vortex, b.vortex),
              m.uniform1f(w.hole, b.hole),
              m.uniform2f(w.center, b.centerX, b.centerY),
              m.uniform1f(w.vignette, b.vignette),
              m.uniform1i(w.colorMode, +("stripes" === b.colorMode)),
              m.uniform4f(w.colorA, a, i, n, l),
              m.uniform4f(w.colorB, s, u, f, c),
              m.uniform4f(w.colorC, p, h, g, _),
              m.uniform4f(w.tint, v, x, y, R),
              m.uniform1f(w.repetition, b.repetition),
              m.uniform1f(w.softness, b.softness),
              m.uniform1f(w.bandWidth, b.bandWidth),
              m.uniform1f(w.shiftRed, b.shiftRed),
              m.uniform1f(w.shiftBlue, b.shiftBlue),
              m.uniform1f(w.spread, b.spread),
              m.uniform1f(w.stripeRadial, b.stripeRadial),
              m.uniform1f(w.threshold, b.threshold),
              m.uniform1f(w.detailFade, b.detailFade),
              m.uniform1f(w.fadeLeft, b.fadeLeft),
              m.uniform1f(w.fadeRight, b.fadeRight),
              m.uniform1f(w.fadeTop, b.fadeTop),
              m.uniform1f(w.fadeBottom, b.fadeBottom));
          },
          y = !1,
          R = !1,
          C = 0,
          S = !1,
          B = !1,
          T = !0,
          A = 0,
          F = 0,
          E = 0,
          M = 0,
          k = 0,
          L = () => b.initialTime + E + M,
          O = L(),
          P = O * b.stripeFlow,
          q = O * b.radialSpin,
          I = () => {
            if (h) return !0;
            if (!p || !(0, n.isProgramComplete)(m, p)) return !1;
            let e = (0, n.finishProgram)(m, p);
            ((p = null),
              (h = e),
              m.useProgram(e),
              m.bindBuffer(m.ARRAY_BUFFER, g));
            let t = m.getAttribLocation(e, "aPosition");
            return (
              m.enableVertexAttribArray(t),
              m.vertexAttribPointer(t, 2, m.FLOAT, !1, 0, 0),
              (w = v()),
              x(),
              !0
            );
          },
          N = () => {
            if (!y && h) {
              let t, r;
              ((r = (t = L()) - O),
                (O = t),
                (P += r * b.stripeFlow),
                (q += r * b.radialSpin),
                m.uniform1f(w.time, L()),
                m.uniform1f(w.stripePhase, P),
                m.uniform1f(w.spinPhase, q),
                m.uniform2f(w.res, e.width, e.height),
                m.clearColor(0, 0, 0, 0),
                m.clear(m.COLOR_BUFFER_BIT),
                m.drawArrays(m.TRIANGLES, 0, 6),
                R || ((R = !0), i()));
            }
          },
          G = () => {
            if (y) return;
            let t = Math.min(window.devicePixelRatio || 1, 1.5),
              r = Math.max(1, Math.floor(e.clientWidth * t)),
              o = Math.max(1, Math.floor(e.clientHeight * t));
            (e.width !== r || e.height !== o) &&
              ((e.width = r), (e.height = o), m.viewport(0, 0, r, o), S || N());
          },
          j = () => 1e-4 > Math.abs(k - M),
          W = () => 0 !== b.speed || !j(),
          H = (e) => {
            let t = Math.min((e - F) / 1e3, 0.1);
            ((F = e),
              (E += t * b.speed),
              j() ? (M = k) : (M += (k - M) * (1 - Math.exp(-(6 * t)))),
              N(),
              W() ? (A = requestAnimationFrame(H)) : (S = !1));
          },
          Y = () => {
            if (y || B) return;
            let e =
              r &&
              T &&
              "visible" === document.visibilityState &&
              (!R || (0, o.isOverlayLifted)()) &&
              W();
            e && !S
              ? ((S = !0),
                (F = performance.now()),
                (A = requestAnimationFrame(H)))
              : !e && S && ((S = !1), cancelAnimationFrame(A));
          },
          Z = new ResizeObserver(G);
        Z.observe(e);
        let U = new IntersectionObserver(([e]) => {
          ((T = e?.isIntersecting ?? !0), Y());
        });
        (U.observe(e), document.addEventListener("visibilitychange", Y));
        let V = (0, o.onOverlayLifted)(Y),
          D = (e) => {
            (e.preventDefault(), (S = !1), cancelAnimationFrame(A), c());
          };
        e.addEventListener("webglcontextlost", D);
        let z = () => {
          if (((C = 0), y)) return;
          let e = !1;
          try {
            e = I();
          } catch {
            c();
            return;
          }
          if (!e) {
            C = requestAnimationFrame(z);
            return;
          }
          (G(), N(), Y());
        };
        return (
          G(),
          z(),
          {
            setParams: (e) => {
              y || ((b = { ...b, ...e }), x(), S || N(), Y());
            },
            setTimeOffset: (e, t) => {
              y || ((k = e), (t?.immediate || !r) && ((M = e), S || N()), Y());
            },
            getTime: L,
            draw: N,
            beginSequence: () => {
              if (y) return null;
              ((B = !0), S && ((S = !1), cancelAnimationFrame(A)), (M = k));
              let e = E,
                t = 0;
              return {
                frame: (r) => {
                  if (y) return !1;
                  try {
                    if (!I()) return !1;
                  } catch {
                    return !1;
                  }
                  return ((t = r), (E = e + r * b.speed), N(), !0);
                },
                end: () => {
                  ((B = !1), (E = e + t * b.speed), Y());
                },
              };
            },
            dispose: () => {
              ((y = !0),
                (S = !1),
                cancelAnimationFrame(A),
                0 !== C && cancelAnimationFrame(C),
                Z.disconnect(),
                U.disconnect(),
                document.removeEventListener("visibilitychange", Y),
                V(),
                e.removeEventListener("webglcontextlost", D),
                m.deleteBuffer(g),
                p && (0, n.disposePendingProgram)(m, p),
                h && m.deleteProgram(h),
                m.getExtension("WEBGL_lose_context")?.loseContext());
            },
          }
        );
      }
      e.s(["createMetallicSwirlRenderer", 0, f, "hexToRgba", 0, d], 682276);
    };

export function createHero(canvas, options = {}) {
  const maskModule = read(433499);
  const raster = maskModule.createRasterizer((width, height) => {
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    return c.getContext("2d", { willReadFrequently: true });
  });
  const mask = maskModule.buildLiquidMask(
    // Match the homepage override; the generic 0.35 default makes the metal darker.
    { width: window.innerWidth >= 1024 ? 2048 : 1024, shadeFloor: 0.6 },
    raster,
  );
  return read(852201).createLiquidRenderer(canvas, mask, {
    intro: true,
    onActive: () => {},
    onError: () => {},
    ...options,
  });
}
export function createSwirl(canvas, params, options = {}) {
  return read(682276).createMetallicSwirlRenderer(canvas, {
    params: { ...read(595687).METALLIC_SWIRL_DEFAULTS, ...params },
    animated: true,
    onReady: () => {},
    onError: () => {},
    ...options,
  });
}
export function createChrome(canvas, options = {}) {
  return read(419289).createSession({
    canvas,
    params: read(238557).CHROME_SYMBOL_DEFAULTS,
    intro: true,
    spin: false,
    width: 420,
    height: 280,
    onLive: () => {},
    onLanded: () => {},
    ...options,
  });
}

export const swirlAt = ((e) => {
  "use strict";
  const n = read(595687),
    l = read(682276);
  let s = new Set(["zoom", "repetition"]),
    u = (e) =>
      Math.round(255 * Math.min(Math.max(e, 0), 1))
        .toString(16)
        .padStart(2, "0"),
    d = (e) => "string" == typeof e && e.startsWith("#"),
    f = (e) => ({
      values: e,
      tangents: (function (e) {
        let t = e.length,
          r = e.slice(0, -1).map((t, r) => e[r + 1] - t),
          o = Array(t).fill(0);
        for (let e = 1; e < t - 1; e++)
          o[e] = r[e - 1] * r[e] <= 0 ? 0 : (r[e - 1] + r[e]) / 2;
        for (let e = 0; e < t - 1; e++) {
          if (0 === r[e]) {
            ((o[e] = 0), (o[e + 1] = 0));
            continue;
          }
          let t = o[e] / r[e],
            a = o[e + 1] / r[e],
            i = t * t + a * a;
          if (i > 9) {
            let n = 3 / Math.sqrt(i);
            ((o[e] = n * t * r[e]), (o[e + 1] = n * a * r[e]));
          }
        }
        return o;
      })(e),
    });
  function c({ values: e, tangents: t }, r) {
    let o = e.length - 1,
      a = Math.min(Math.max(r, 0), o),
      i = Math.min(Math.floor(a), o - 1),
      n = a - i,
      l = n * n,
      s = l * n;
    return (
      (2 * s - 3 * l + 1) * e[i] +
      (s - 2 * l + n) * t[i] +
      (-2 * s + 3 * l) * e[i + 1] +
      (s - l) * t[i + 1]
    );
  }
  let m = {
      speed: 0,
      initialTime: 0,
      zoom: 2.1,
      iterations: 2,
      sampleGap: 0.14,
      tangentForce: 0.83,
      gradientForce: 0.27,
      centerX: 0.17,
      centerY: 0.95,
      radialMix: 0,
      beams: 5,
      beamWidth: 0.62,
      radialStretch: 1.46,
      radialFlow: 2,
      radialSpin: -0.3,
      twist: -0.19,
      vortex: -0.55,
      hole: 0.16,
      colorMode: "stripes",
      colorA: "#a8d2ff",
      colorB: "#00000000",
      colorC: "#dfeaff00",
      tintColor: "#ffffff00",
      softness: 0.7,
      shiftRed: 0.3,
      shiftBlue: 0.2,
      repetition: 3,
      stripeFlow: 0.56,
      spread: 0.03,
      brightness: 1,
      contrast: 1,
      vignette: 0,
      detailFade: 1,
      backgroundColor: "#00000000",
      opacity: 1,
      fadeTop: 0.5,
      fadeBottom: 0.5,
      threshold: 0.69,
    },
    p = [
      m,
      {
        speed: 0,
        initialTime: 0,
        zoom: 2.11,
        iterations: 2,
        sampleGap: 0.14,
        tangentForce: 0.83,
        gradientForce: 0.27,
        centerX: 0.17,
        centerY: 0.45,
        radialMix: 0,
        beams: 5,
        beamWidth: 1,
        radialStretch: 0.69,
        radialFlow: -2.07,
        radialSpin: -0.3,
        twist: -0.19,
        vortex: -0.55,
        hole: 0,
        colorMode: "stripes",
        colorA: "#a8d2ff",
        colorB: "#00000000",
        colorC: "#dfeaff00",
        tintColor: "#ffffff00",
        softness: 0.31,
        shiftRed: 0.3,
        shiftBlue: 0.2,
        repetition: 1.9,
        stripeFlow: 0.99,
        spread: 0.02,
        brightness: 1,
        contrast: 1,
        vignette: 0,
        detailFade: 1,
        backgroundColor: "#00000000",
        opacity: 1,
        fadeTop: 0.5,
        fadeBottom: 0.5,
      },
      {
        speed: 0,
        initialTime: 0,
        zoom: 0.25,
        iterations: 2,
        sampleGap: 0.147,
        tangentForce: 0.83,
        gradientForce: 0.2,
        centerX: 0.5,
        centerY: 0.59,
        radialMix: 0.39,
        beams: 5,
        beamWidth: 0.84,
        radialStretch: 1.3,
        radialFlow: -2.07,
        radialSpin: -0.3,
        twist: 0.12,
        vortex: -0.52,
        hole: 1,
        colorMode: "stripes",
        colorA: "#a8d2ff",
        colorB: "#00000000",
        colorC: "#dfeaff00",
        tintColor: "#ffffff00",
        softness: 0.31,
        shiftRed: 0.3,
        shiftBlue: 0.2,
        repetition: 3.5,
        stripeFlow: 0.99,
        spread: 0.02,
        brightness: 0.14,
        contrast: 1,
        vignette: 0,
        detailFade: 1,
        backgroundColor: "#00000000",
        opacity: 1,
        fadeTop: 0.5,
        fadeBottom: 0.5,
      },
      {
        speed: 0.1,
        initialTime: 0,
        zoom: 2,
        iterations: 3,
        sampleGap: 0.147,
        tangentForce: -1.2,
        gradientForce: 0.5,
        centerX: 0.5,
        centerY: 0.594,
        radialMix: 1,
        beams: 5,
        beamWidth: 1,
        radialStretch: 2,
        radialFlow: 1.91,
        radialSpin: -0.24,
        twist: -0,
        vortex: -0,
        hole: 1,
        colorMode: "stripes",
        colorA: "#ffffffff",
        colorB: "#00000000",
        colorC: "#dfeaff00",
        tintColor: "#ffffff00",
        softness: 0.41,
        shiftRed: -0.7,
        shiftBlue: -0.59,
        repetition: 1.14,
        stripeFlow: 0.99,
        spread: 0.02,
        brightness: 1,
        contrast: 1,
        vignette: 0,
        detailFade: 1,
        backgroundColor: "#00000000",
        opacity: 1,
        fadeTop: 0.5,
        fadeBottom: 0.5,
        threshold: 0.72,
      },
      {
        speed: 0,
        initialTime: 0,
        zoom: 2,
        iterations: 3,
        sampleGap: 0.147,
        tangentForce: -1.2,
        gradientForce: 0.5,
        centerX: 0.5,
        centerY: 1,
        radialMix: 1,
        beams: 5,
        beamWidth: 1,
        radialStretch: 2,
        radialFlow: 1.91,
        radialSpin: -0.24,
        twist: -0,
        vortex: -0,
        hole: 1,
        colorMode: "stripes",
        colorA: "#ffffffff",
        colorB: "#00000000",
        colorC: "#dfeaff00",
        tintColor: "#ffffff00",
        softness: 0.41,
        shiftRed: -0.7,
        shiftBlue: -0.59,
        repetition: 1.14,
        stripeFlow: 0.99,
        spread: 0.02,
        brightness: 1,
        contrast: 1,
        vignette: 0,
        detailFade: 1,
        backgroundColor: "#00000000",
        opacity: 1,
        fadeTop: 0.5,
        fadeBottom: 0.5,
        threshold: 0.72,
      },
    ].map((e) => ({ ...n.METALLIC_SWIRL_DEFAULTS, ...e })),
    h = (function (e) {
      if (e.length < 2) throw Error("need at least two keyframes");
      let t = new Map(),
        r = new Map(),
        o = [];
      for (let a of Object.keys(e[0])) {
        let i = e.map((e) => e[a]);
        if (i.every((e) => "number" == typeof e)) {
          let e = s.has(a) && i.every((e) => e > 0);
          t.set(a, { track: f(e ? i.map(Math.log) : i), geometric: e });
        } else if (i.every(d)) {
          let e = i.map(l.hexToRgba);
          r.set(
            a,
            [0, 1, 2, 3].map((t) => f(e.map((e) => e[t]))),
          );
        } else o.push(a);
      }
      return (a) => {
        let i = { ...e[0] };
        for (let [e, { track: r, geometric: o }] of t) {
          let t = c(r, a);
          i[e] = o ? Math.exp(t) : t;
        }
        for (let [e, t] of r) i[e] = `#${t.map((e) => u(c(e, a))).join("")}`;
        let n = e[Math.min(Math.max(Math.round(a), 0), e.length - 1)];
        for (let e of o) i[e] = n[e];
        return i;
      };
    })(p);
  return h;
})();
