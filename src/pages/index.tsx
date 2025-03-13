import yayJpg from '../assets/yay.jpg';
import vtk from '../../Sources/index.js';
import {useEffect, useRef} from "react";


// @ts-ignore
const vtkRenderWindow = vtk.Rendering.Core.vtkRenderWindow;
// @ts-ignore
const vtkRenderer = vtk.Rendering.Core.vtkRenderer;
debugger
// @ts-ignore
const vtkOpenGLRenderWindow = vtk.Rendering.OpenGL.vtkRenderWindow;
// @ts-ignore
const vtkRenderWindowInteractor = vtk.Rendering.Core.vtkRenderWindowInteractor;
// @ts-ignore
const vtkSphereSource = vtk.Filters.Sources.vtkSphereSource;
// @ts-ignore
const vtkMapper = vtk.Rendering.Core.vtkMapper;
// @ts-ignore
const vtkActor = vtk.Rendering.Core.vtkActor;
console.log(vtk);
export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!containerRef.current) return;

        // 创建 VTK 渲染窗口
        const renderWindow = vtkRenderWindow.newInstance();
        const renderer = vtkRenderer.newInstance();
        renderWindow.addRenderer(renderer);

        // 创建 OpenGL 渲染窗口
        const openGLRenderWindow = vtkOpenGLRenderWindow.newInstance();
        openGLRenderWindow.setContainer(containerRef.current);
        renderWindow.addView(openGLRenderWindow);

        // 交互控制
        const interactor = vtkRenderWindowInteractor.newInstance();
        interactor.setView(openGLRenderWindow);
        interactor.initialize();
        interactor.bindEvents(containerRef.current);

        // 创建一个球体
        const sphereSource = vtkSphereSource.newInstance({ radius: 1.0, thetaResolution: 32, phiResolution: 32 });
        const mapper = vtkMapper.newInstance();
        mapper.setInputConnection(sphereSource.getOutputPort());

        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);
        renderer.addActor(actor);

        // 设置渲染器背景颜色
        renderer.setBackground(0.1, 0.1, 0.1);
        renderer.resetCamera();

        // 触发渲染
        renderWindow.render();

        return () => {
            renderWindow.delete();
        };
    }, []);

    return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
